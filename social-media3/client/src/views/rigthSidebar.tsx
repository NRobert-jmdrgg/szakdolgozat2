import * as React from "react";
import Box from "@mui/material/Box";
import SearchField from "../components/searchField";
import Button from "@mui/material/Button";
import SuggestedAccounts from "../components/suggestedAccounts";
import { useAuth0 } from "@auth0/auth0-react";

export interface RightSidebarProps {
  setShowNewPostMenu: () => void;
}

export default function RightSidebar({
  setShowNewPostMenu,
}: RightSidebarProps) {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ bgcolor: "blue", width: "300px" }}>
      <SearchField width={300} />

      {isAuthenticated && (
        <>
          <Box sx={{ mt: "17px", mb: "17px", textAlign: "center" }}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setShowNewPostMenu(true)}
            >
              New post
            </Button>
          </Box>
          <SuggestedAccounts
            accounts={[{ displayName: "rob", handleName: "rob" }]}
          />
        </>
      )}
    </Box>
  );
}
