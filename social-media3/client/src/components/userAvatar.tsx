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

export default function UserAvatar({ src, alt, size }: UserAvatarProps) {
  let avatarProps;
  const sx = size ? { sx: { width: size, height: size } } : {};
  if (src) {
    avatarProps = { alt: alt, src: src, ...sx };
  } else {
    avatarProps = {
      alt: "default avatar",
      src: "/default_avatar.png",
      ...sx,
    };
  }
  return <Avatar {...avatarProps} />;
}
