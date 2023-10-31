import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import UserAvatar from "./userAvatar";

enum NotificationVariant {
  LIKE,
  REPLY,
  SHARE,
}

export interface Notification {
  key: number;
  image: string;
  displayName: string;
  variant: NotificationVariant;
}

export interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({
  notifications,
}: NotificationListProps) {
  return (
    <List sx={{ width: "600px", bgcolor: "background.paper" }}>
      {notifications.map((notification, index) => {
        const { image, displayName, variant } = notification;

        let message;
        if (variant === REPLY) message = "has replied to your post";
        else if (variant === LIKE) message = "has liked your post";
        else if (variant === SHARE) message = "has shared your post";

        return (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <UserAvatar src={image} alt={displayName} />
            </ListItemAvatar>
            <ListItemText primary={displayName} secondary={message} />
          </ListItem>
        );
      })}
    </List>
  );
}
