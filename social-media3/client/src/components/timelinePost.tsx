import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LoveCheckbox } from "./checkbox";
import UserAvatar from "./userAvatar";
import moment from "moment";
import ReplyIcon from "@mui/icons-material/Reply";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import socialMediaNumberFormatter from "../utils/numberFormatter";
import PostImageList from "./imageList";

export interface TimelinePostProps {
  displayName: string;
  profileName: string;
  profileImage?: string;
  heartCount: number;
  shareCount: number;
  replyCount: number;
  date: number;
  text?: string;
  images?: string[];
}

export default function TimelinePost({
  displayName,
  profileName,
  profileImage,
  heartCount,
  shareCount,
  replyCount,
  date,
  text,
  images,
}: TimelinePostProps) {
  const nHearts = socialMediaNumberFormatter(heartCount);
  const nShares = socialMediaNumberFormatter(shareCount);
  const nReplies = socialMediaNumberFormatter(replyCount);
  return (
    <Box sx={{ backgroundColor: "primary.dark", width: "600px" }}>
      <Box sx={{ display: "flex", padding: "10px" }}>
        <UserAvatar alt={displayName} src={profileImage} />
        <Box sx={{ display: "flex", ml: "10px", alignItems: "center" }}>
          <Typography sx={{ m: 0 }} variant="subtitle1">
            {displayName}
          </Typography>
          <Typography sx={{ ml: "5px" }} variant="caption">
            @{profileName}
          </Typography>
          <Typography sx={{ ml: "5px" }} variant="caption">
            {moment(date).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ ml: "10px", mr: "10px" }}>
        <Typography variant="body1">{text ?? ""}</Typography>
      </Box>
      <Box>
        <PostImageList images={images} />
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoveCheckbox />
          <Typography variant="caption" sx={{ ml: "5px" }}>
            {nHearts}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Typography variant="caption" sx={{ ml: "5px" }}>
            {nShares}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton aria-label="reply">
            <ReplyIcon />
          </IconButton>
          <Typography variant="caption" sx={{ ml: "5px" }}>
            {nReplies}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
