export const WAVE_AMPLITUDE = 10;
export const Y_POSITIONS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

// --- Time-based Color Constants ---
export const MIDNIGHT_COLOR = { r: 15, g: 23, b: 42 }; // slate-900
export const SUNRISE_SUNSET_COLOR = { r: 255, g: 165, b: 0 }; // orange
export const MIDDAY_COLOR = { r: 135, g: 206, b: 235 }; // skyblue

// --- Time points in minutes from midnight ---
export const MIDNIGHT = 0;
export const SUNRISE = 9 * 60; // 9:00
export const MIDDAY = 12 * 60; // 12:00
export const SUNSET = 21 * 60; // 21:00
export const END_OF_DAY = 24 * 60;

// --- Utility Functions ---

export type RGB = { r: number; g: number; b: number };

export function mixColors(color1: RGB, color2: RGB, weight: number): RGB {
  const w = Math.max(0, Math.min(1, weight));
  return {
    r: Math.round(color1.r * (1 - w) + color2.r * w),
    g: Math.round(color1.g * (1 - w) + color2.g * w),
    b: Math.round(color1.b * (1 - w) + color2.b * w),
  };
}

export function rgbToString(color: RGB): string {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function getGradientColors(): { top: string; bottom: string } {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();

  let topColor: RGB;

  if (totalMinutes >= MIDNIGHT && totalMinutes < SUNRISE) {
    const weight = totalMinutes / SUNRISE;
    topColor = mixColors(MIDNIGHT_COLOR, SUNRISE_SUNSET_COLOR, weight);
  } else if (totalMinutes >= SUNRISE && totalMinutes < MIDDAY) {
    const weight = (totalMinutes - SUNRISE) / (MIDDAY - SUNRISE);
    topColor = mixColors(SUNRISE_SUNSET_COLOR, MIDDAY_COLOR, weight);
  } else if (totalMinutes >= MIDDAY && totalMinutes < SUNSET) {
    const weight = (totalMinutes - MIDDAY) / (SUNSET - MIDDAY);
    topColor = mixColors(MIDDAY_COLOR, SUNRISE_SUNSET_COLOR, weight);
  } else {
    const weight = (totalMinutes - SUNSET) / (END_OF_DAY - SUNSET);
    topColor = mixColors(SUNRISE_SUNSET_COLOR, MIDNIGHT_COLOR, weight);
  }

  // Make bottom color a darker shade of the top color
  const bottomColor = mixColors(topColor, MIDNIGHT_COLOR, 0.5);

  return { top: rgbToString(topColor), bottom: rgbToString(bottomColor) };
}

export function buildWavePath(yPosition: number): string {
  const baseY = yPosition * 100;
  const points = Math.ceil(2 + Math.random() * 3);
  const step = 100 / (points - 1);
  const min = baseY - WAVE_AMPLITUDE * 1.5;
  const max = baseY + WAVE_AMPLITUDE * 1.5;
  let lastY = baseY;

  const pts = Array.from({ length: points }, (_, i) => {
    const randomMagnitude = WAVE_AMPLITUDE * (0.3 + Math.random() * 0.7);
    const dir =
      lastY > baseY ? -1 : lastY < baseY ? 1 : Math.random() > 0.5 ? 1 : -1;
    const noise = (Math.random() - 0.5) * WAVE_AMPLITUDE * 0.5;
    const y = Math.min(
      max,
      Math.max(min, baseY + dir * randomMagnitude + noise),
    );
    lastY = y;
    return { x: i * step, y };
  });

  let d = `M 0 110 L ${pts[0].x} ${pts[0].y} `;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpX = (prev.x + curr.x) / 2;
    d += `C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y} `;
  }
  d += `L 100 110 Z`;

  return d;
}
