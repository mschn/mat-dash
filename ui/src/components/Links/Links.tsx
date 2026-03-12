import { Button, Flex } from "@chakra-ui/react";
import bitwardenIcon from "../../assets/bitwarden.svg";
import githubIcon from "../../assets/github.svg";
import gmailIcon from "../../assets/gmail.svg";
import youtubeMusic from "../../assets/youtube-music.svg";
import { Card } from "../Card";

export function Links(): React.ReactNode {
  const links: { url: string; icon: string; name: string }[] = [
    {
      name: "Vaultwarden",
      url: "https://mschn.ddns.net/vw/#/login",
      icon: bitwardenIcon,
    },
    { name: "Gmail", url: "http://gmail.com", icon: gmailIcon },
    { name: "Github", url: "http://github.com", icon: githubIcon },
    {
      name: "Youtube Music",
      url: "https://music.youtube.com/",
      icon: youtubeMusic,
    },
  ];

  return (
    <Card>
      <Flex gap={1}>
        {links.map((link) => (
          <Button variant="ghost" asChild>
            <a href={link.url} target="_blank">
              <img src={link.icon} width="32px" height="32px" />
            </a>
          </Button>
        ))}
      </Flex>
    </Card>
  );
}
