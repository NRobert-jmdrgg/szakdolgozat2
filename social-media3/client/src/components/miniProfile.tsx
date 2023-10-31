import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileCard from "./profileCard";
import LogoutIcon from "@mui/icons-material/Logout";
import socialMediaNumberFormatter from "../utils/numberFormatter";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export interface MiniProfileProps {
  displayName: string;
  profileName: string;
  profileImage?: string;
  notificationCount: number;
}
export default function MiniProfile({
  displayName,
  profileName,
  profileImage,
  notificationCount,
}: MiniProfileProps) {
  const nNotifications = socialMediaNumberFormatter(notificationCount);
  const { logout } = useAuth0();
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
        <Box sx={{ display: "flex", alignItems: "center", ml: "10px" }}>
          <NotificationsIcon />
          <Typography variant="caption" sx={{ ml: "5px" }}>
            {nNotifications}
          </Typography>
        </Box>

        <IconButton
          aria-label="logout"
          onClick={() => {
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            });
          }}
        >
          <LogoutIcon />
        </IconButton>

        <Link component={RouterLink} to="/settings" sx={{ mr: "5px" }}>
          <IconButton aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
}
