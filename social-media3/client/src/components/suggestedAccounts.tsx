import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import UserAvatar from "./userAvatar";
import Box from "@mui/material/Box";

export interface AccountInfo {
  profileImage?: string;
  displayName: string;
  profileName: string;
}

export interface SuggestedAccountsProps {
  accounts: AccountInfo[];
}

export default function SuggestedAccounts({
  accounts,
}: SuggestedAccountsProps) {
  return (
    <>
      <Typography variant="h6" sx={{ ml: "10px" }}>
        Suggested accounts
      </Typography>
      <List sx={{ width: "300px", bgcolor: "background.paper" }}>
        {accounts.map((account, index) => {
          return (
            <Box key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <UserAvatar
                    src={account.profileImage}
                    alt={account.displayName}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={account.displayName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        @{account.profileName}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < accounts.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </Box>
          );
        })}
      </List>
    </>
  );
}
