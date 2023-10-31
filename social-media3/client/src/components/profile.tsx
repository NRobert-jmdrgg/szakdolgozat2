import * as React from "react";
import Typography from "@mui/material/Typography";
import UserAvatar, { AvatarSize } from "./userAvatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import socialMediaNumberFormatter from "../utils/numberFormatter";

export interface ProfileProps {
  displayName: string;
  handleName: string;
  description: string;
  followerCount: number;
  postCount: number;
  profileImage?: string;
  profileBannerImage?: string;
}

export default function Profile({
  displayName,
  handleName,
  description,
  followerCount,
  postCount,
  profileImage,
  profileBannerImage,
}: ProfileProps) {
  const nPosts = socialMediaNumberFormatter(postCount);
  const nFollowers = socialMediaNumberFormatter(followerCount);
  return (
    <Box sx={{ backgroundColor: "primary.dark", width: "600px" }}>
      <Box>
        <img
          src={profileBannerImage ?? "/default_banner.png"}
          alt="Profile banner"
          width="600px"
          height="200px"
          style={{ objectFit: "cover", display: "block" }}
        />
      </Box>
      <Box
        sx={{ ml: "10px", mt: "20px", display: "flex", alignItems: "center" }}
      >
        <UserAvatar
          src={profileImage}
          alt={displayName}
          size={AvatarSize.large}
        />
        <Box sx={{ ml: "10px" }}>
          <Box>
            <Typography variant="h5">{displayName}</Typography>
          </Box>
          <Box>
            <Typography variant="caption">@{handleName}</Typography>
          </Box>
        </Box>
        <Box sx={{ ml: "auto", mr: "10px" }}>
          <Button variant="contained">Follow</Button>
        </Box>
      </Box>
      <Box sx={{ ml: "10px", mt: "10px" }}>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Box sx={{ mt: "10px", ml: "10px" }}>
        <Typography variant="caption" sx={{ mb: "10px" }}>
          {nPosts} posts
        </Typography>
        <Typography variant="caption" sx={{ mb: "10px", ml: "10px" }}>
          {nFollowers} followers
        </Typography>
      </Box>
    </Box>
  );
}
