import * as React from "react";
import Box from "@mui/material/Box";
import { ButtonCheckbox } from "./buttonCheckbox";

export default function SetupSelectInterests() {
  const interestCategories = [
    "Arts And Culture",
    "Fashion And Style",
    "Learning And Educational",
    "Science And Technology",
    "Business And Entrepreneurs",
    "Film Tv And Video",
    "Music",
    "Sports",
    "Celebrity And Pop Culture",
    "Fitness And Health",
    "News And Social Concern",
    "Travel And Adventure",
    "Diaries And Daily Life",
    "Food And Dining",
    "Other Hobbies",
    "Youth And Student Life",
    "Family",
    "Gaming",
    "Relationships",
  ];
  return (
    <Box className="text-center">
      {interestCategories.map((category, index) => (
        <Box key={index} className="m-1 inline-block">
          <ButtonCheckbox label={category} />
        </Box>
      ))}
    </Box>
  );
}
