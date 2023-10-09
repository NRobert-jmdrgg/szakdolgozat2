import * as React from "react";
import Avatar from "@mui/material/Avatar";

export enum AvatarSize {
  normal = 56,
  large = 96,
}

export interface UserAvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function UserAvatar({ src, alt, size }: UserAvatarProps) {
  let avatarProps;
  const sx = size ? { sx: { width: size, height: size } } : {};
  if (src) {
    avatarProps = { alt: alt, src: src, ...sx };
  } else {
    avatarProps = { ...stringAvatar(alt), ...sx };
  }
  return <Avatar {...avatarProps} />;
}
