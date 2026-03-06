// Types derived from the Strava API v3 (https://developers.strava.com/docs/reference/)

export interface MetaAthlete {
  id: number
  resource_state: number
}

export interface PolylineMap {
  id: string
  summary_polyline: string | null
  resource_state: number
}

export interface Athlete {
  id: number
  username: string
  resource_state: number
  firstname: string
  lastname: string
  bio: string
  city: string
  state: string
  country: string
  sex: 'M' | 'F'
  premium: boolean
  summit: boolean
  created_at: string
  updated_at: string
  badge_type_id: number
  weight: number
  profile_medium: string
  profile: string
  friend: null
  follower: null
}

export interface SummaryActivity {
  id: number
  resource_state: number
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  sport_type: string
  workout_type: number | null
  device_name?: string
  start_date: string
  start_date_local: string
  timezone: string
  utc_offset: number
  location_city: string | null
  location_state: string | null
  location_country: string | null
  achievement_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  athlete: MetaAthlete
  map: PolylineMap
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  visibility: string
  flagged: boolean
  gear_id: string | null
  start_latlng: [number, number] | []
  end_latlng: [number, number] | []
  average_speed: number
  max_speed: number
  average_cadence?: number
  average_temp?: number
  average_watts?: number
  max_watts?: number
  weighted_average_watts?: number
  device_watts?: boolean
  kilojoules?: number
  has_heartrate: boolean
  average_heartrate?: number
  max_heartrate?: number
  heartrate_opt_out: boolean
  display_hide_heartrate_option: boolean
  elev_high?: number
  elev_low?: number
  upload_id: number | null
  upload_id_str?: string | null
  external_id: string | null
  from_accepted_tag: boolean
  pr_count: number
  total_photo_count: number
  has_kudoed: boolean
}
