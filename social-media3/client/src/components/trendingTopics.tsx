import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import socialMediaNumberFormatter from "../utils/numberFormatter";
import Typography from "@mui/material/Typography";

export interface Trend {
  title: string;
  postCount: number;
}

export interface TrendingTopicsProps {
  trends: Trend[];
}

export default function TrendingTopics({ trends }: TrendingTopicsProps) {
  return (
    <>
      <Typography variant="h6" sx={{ ml: "10px" }}>
        Trending topics
      </Typography>

      <List sx={{ width: "300px", bgcolor: "background.paper" }}>
        {trends.map((trend, index) => {
          const nPosts = socialMediaNumberFormatter(trend.postCount);
          return (
            <React.Fragment key={index}>
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={trend.title}
                  secondary={<React.Fragment>{nPosts} posts</React.Fragment>}
                />
              </ListItem>
              {index < trends.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
}
