import * as React from "react";
import Profile from "../components/profile";
import PostList from "../containers/postList";
import Post from "../components/post";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query Query($where: UserWhere) {
    users(where: $where) {
      description
      displayName
      handleName
      followerCount
      postCount
      profileImage
      profileBannerImage
    }
  }
`;

const GET_USER_POSTS = gql`
  query Query($where: PostWhere) {
    posts(where: $where) {
      createdAt
      postId
      text
      likeCount
      shareCount
      replyCount
    }
  }
`;

export default function User() {
  const { handle } = useParams();

  const userResult = useQuery(GET_USER, {
    variables: { where: { handleName: handle } },
  });

  const postsResult = useQuery(GET_USER_POSTS, {
    variables: { where: { author: { handleName: handle } } },
  });

  if (userResult.loading) {
    return <p>Loading...</p>;
  }

  if (userResult.error) {
    return <p>Error: {userResult.error.message}</p>;
  }

  const {
    displayName,
    handleName,
    description,
    followerCount,
    postCount,
    profileImage,
    profileBannerImage,
  } = userResult.data.users[0];

  if (postsResult.loading) {
    return <p>Loading...</p>;
  }

  if (postsResult.error) {
    return <p>Error: {postsResult.error.message}</p>;
  }

  const { posts } = postsResult.data;

  return (
    <Box>
      <Profile
        displayName={displayName}
        handleName={handleName}
        description={description}
        postCount={postCount}
        followerCount={followerCount}
        profileImage={profileImage}
        profileBannerImage={profileBannerImage}
      />
      <PostList>
        {posts.map((post, index) => {
          const { createdAt, likeCount, shareCount, replyCount, text } = post;
          return (
            <Post
              key={index}
              displayName={displayName}
              handleName={handle}
              likeCount={likeCount}
              replyCount={replyCount}
              shareCount={shareCount}
              text={text}
              date={createdAt}
            />
          );
        })}
      </PostList>
    </Box>
  );
}
