import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Timeline from "./views/timeline";
import MiniProfile from "./components/miniProfile";
import TrendingTopics from "./components/trendingTopics";
import SearchField from "./components/searchField";
import SuggestedAccounts from "./components/suggestedAccounts";
import TimelineToggleButton from "./components/timelineToggleButton";
import TimelinePost, { TimelinePostProps } from "./components/timelinePost";
import Button from "@mui/material/Button";
import NewPost from "./views/newPost";

export default function App() {
  const tt = [
    { title: "asd1", postCount: 123 },
    { title: "asd1", postCount: 123 },
    { title: "asd1", postCount: 123 },
    { title: "asd1", postCount: 123 },
    { title: "asd1", postCount: 123 },
    { title: "asd1", postCount: 123 },
  ];
  const tp = [
    {
      displayName: "Róbert Nagy",
      profileName: "rob8177",
      heartCount: 100,
      shareCount: 10,
      replyCount: 10,
      date: Date.now(),
      text: "hello world",
    },
    {
      displayName: "Róbert Nagy",
      profileName: "rob8177",
      heartCount: 100,
      shareCount: 10,
      replyCount: 10,
      date: Date.now(),
      text: "hello world",
    },
    {
      displayName: "Róbert Nagy",
      profileName: "rob8177",
      heartCount: 100,
      shareCount: 10,
      replyCount: 10,
      date: Date.now(),
      text: "hello world",
    },
    {
      displayName: "Róbert Nagy",
      profileName: "rob8177",
      heartCount: 100,
      shareCount: 10,
      replyCount: 10,
      date: Date.now(),
      text: "hello world",
    },
    {
      displayName: "Róbert Nagy",
      profileName: "rob8177",
      heartCount: 100,
      shareCount: 10,
      replyCount: 10,
      date: Date.now(),
      text: "hello world",
    },
    {
      displayName: "Róbert Nagy",
      profileName: "rob8177",
      heartCount: 100,
      shareCount: 10,
      replyCount: 10,
      date: Date.now(),
      text: "hello world",
    },
    {
      displayName: "Róbert Nagy",
      profileName: "rob8177",
      heartCount: 100,
      shareCount: 10,
      replyCount: 10,
      date: Date.now(),
      text: "hello world",
    },
  ];
  const sa = [
    { displayName: "Róbert Nagy", profileName: "rob8177" },
    { displayName: "Róbert Nagy", profileName: "rob8177" },
    { displayName: "Róbert Nagy", profileName: "rob8177" },
  ];

  const [showNewPostMenu, setShowNewPostMenu] = React.useState(false);

  return (
    <Container disableGutters sx={{ zIndex: 1, position: "relative" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Box sx={{ bgcolor: "red", width: "300px" }}>
          <MiniProfile
            displayName="Róbert Nagy"
            profileName="rob81777"
            followerCount={100}
            notificationCount={10}
            heartCount={1}
          />
          <TrendingTopics trends={tt} />
        </Box>
        <Box sx={{ bgcolor: "green", width: "600px" }}>
          <Box sx={{ textAlign: "center" }}>
            <TimelineToggleButton />
          </Box>
          <Timeline>
            {tp.map((post: TimelinePostProps, index) => {
              return <TimelinePost key={index} {...post} />;
            })}
          </Timeline>
        </Box>
        <Box sx={{ bgcolor: "blue", width: "300px" }}>
          <SearchField width={300} />
          <Box sx={{ mt: "17px", mb: "17px", textAlign: "center" }}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setShowNewPostMenu(true)}
            >
              New post
            </Button>
          </Box>
          <SuggestedAccounts accounts={sa} />
        </Box>
      </Box>
      {showNewPostMenu && <NewPost hide={() => setShowNewPostMenu(false)} />}
    </Container>
  );
}
