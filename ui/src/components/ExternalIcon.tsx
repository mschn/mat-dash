import { Link, type LinkProps } from "@chakra-ui/react";
import external from "../assets/external.svg";

export function ExternalLink({
  name,
  href,
  ...props
}: {
  name: string;
  href: string;
} & LinkProps): React.ReactNode {
  return (
    <Link href={href} target="_blank" {...props} color="blue.600">
      {name} <img src={external} width="16" height="16" />
    </Link>
  );
}
