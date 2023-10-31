import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Trend } from "../components/trendingTopics";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TrendingTopics from "../components/trendingTopics";
import MiniProfile from "../components/miniProfile";

export interface LeftSidebarProps {
  trends: Trend[];
}

export default function LeftSidebar({ trends }: LeftSidebarProps) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ bgcolor: "red", width: "300px" }}>
      {(!isAuthenticated && (
        <Box
          sx={{
            width: 300,
            height: 126,
            backgroundColor: "primary.dark",
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ ml: "10px" }}>
              Login to interact with posts
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          </Box>
        </Box>
      )) || (
        <MiniProfile
          displayName="Róbert Nagy"
          profileName="rob81777"
          notificationCount={10}
        />
      )}
      <TrendingTopics trends={trends} />
    </Box>
  );
}
