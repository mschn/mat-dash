import { Box, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export function Card({
  children,
  ...props
}: { children: ReactNode } & BoxProps): ReactNode {
  return (
    <Box bgColor="gray.100/80" p="6" borderRadius="md" shadow="lg" {...props}>
      {children}
    </Box>
  );
}
