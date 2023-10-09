import * as React from "react";
import Box from "@mui/material/Box";
import UserAvatar, { AvatarSize } from "./userAvatar";
import Typography from "@mui/material/Typography";

export interface ProfileCardProps {
  displayName: string;
  profileName: string;
  profileImage?: string;
}

export default function ProfileCard({
  displayName,
  profileName,
  profileImage,
}: ProfileCardProps) {
  return (
    <Box sx={{ display: "flex", padding: "10px" }}>
      <UserAvatar
        alt={displayName}
        src={profileImage}
        size={AvatarSize.normal}
      />
      <Box sx={{ ml: "10px" }}>
        <Typography sx={{ m: 0 }} variant="h6">
          {displayName}
        </Typography>
        <Typography sx={{ m: 0 }} variant="subtitle2">
          @{profileName}
        </Typography>
      </Box>
    </Box>
  );
}
