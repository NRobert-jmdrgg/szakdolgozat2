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
import { useAuth0 } from "@auth0/auth0-react";

export interface PostProps {
  displayName: string;
  handleName: string;
  profileImage?: string;
  likeCount: number;
  shareCount: number;
  replyCount: number;
  date: string;
  text?: string;
  images?: string[];
  setLoginPopupMessage: () => void;
  setShowLoginPopup: () => void;
}

export default function Post({
  displayName,
  handleName,
  profileImage,
  likeCount,
  shareCount,
  replyCount,
  date,
  text,
  images,
  setLoginPopupMessage,
  setShowLoginPopup,
}: PostProps) {
  const { isAuthenticated } = useAuth0();
  const nLikes = socialMediaNumberFormatter(likeCount);
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
            @{handleName}
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
          <LoveCheckbox
            onClick={() => {
              if (!isAuthenticated) {
                setLoginPopupMessage("like posts");
                setShowLoginPopup(true);
              }
            }}
          />
          <Typography variant="caption" sx={{ ml: "5px" }}>
            {nLikes}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            aria-label="share"
            onClick={() => {
              if (!isAuthenticated) {
                setLoginPopupMessage("share posts");
                setShowLoginPopup(true);
              }
            }}
          >
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
          <IconButton
            aria-label="reply"
            onClick={() => {
              if (!isAuthenticated) {
                setLoginPopupMessage("reply to posts");
                setShowLoginPopup(true);
              }
            }}
          >
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
