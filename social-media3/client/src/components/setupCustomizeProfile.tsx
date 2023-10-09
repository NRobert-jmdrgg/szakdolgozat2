import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function SetupCostomizeProfile() {
  const default_image = "/default_avatar.png";
  return (
    <Box className="items-center text-center">
      <Box className="flex">
        <Box className="overflow-hidden rounded-full relative">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={default_image}
            alt="profile image"
          />
        </Box>
        <Button
          className="ml-3"
          component="label"
          variant="text"
          startIcon={<CloudUploadIcon />}
        >
          Select profile picture
          <VisuallyHiddenInput type="file" />
        </Button>
      </Box>
      <Box>
        <TextField
          id="outlined-multiline-static"
          label="Profile description"
          multiline
          rows={4}
          placeholder="Default description"
        />
      </Box>
    </Box>
  );
}
