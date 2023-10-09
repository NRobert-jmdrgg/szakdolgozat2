import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileCard from "./profileCard";
import LogoutIcon from "@mui/icons-material/Logout";
import socialMediaNumberFormatter from "../utils/numberFormatter";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export interface MiniProfileProps {
  displayName: string;
  profileName: string;
  profileImage?: string;
  followerCount: number;
  notificationCount: number;
  heartCount: number;
}

export default function MiniProfile({
  displayName,
  profileName,
  profileImage,
  followerCount,
  notificationCount,
  heartCount,
}: MiniProfileProps) {
  const nFollowers = socialMediaNumberFormatter(followerCount);
  const nNotifications = socialMediaNumberFormatter(notificationCount);
  const nHearts = socialMediaNumberFormatter(heartCount);
  return (
    <Box
      sx={{
        width: 300,
        height: 126,
        backgroundColor: "primary.dark",
      }}
    >
      <ProfileCard
        displayName={displayName}
        profileName={profileName}
        profileImage={profileImage}
      />
      <Box sx={{ display: "flex", ml: "10px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FavoriteIcon />
          <Typography variant="caption" sx={{ ml: "5px" }}>
            {nHearts}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", ml: "10px" }}>
          <PeopleAltIcon />
          <Typography variant="caption" sx={{ ml: "5px" }}>
            {nFollowers}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", ml: "10px" }}>
          <NotificationsIcon />
          <Typography variant="caption" sx={{ ml: "5px" }}>
            {nNotifications}
          </Typography>
        </Box>
        <Link component={RouterLink} to="/login" sx={{ ml: "auto", mr: "5" }}>
          <IconButton aria-label="logout">
            <LogoutIcon />
          </IconButton>
        </Link>
        <Link component={RouterLink} to="/settings" sx={{ mr: "5px" }}>
          <IconButton aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
}
