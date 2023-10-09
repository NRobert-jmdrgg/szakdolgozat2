import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";

export interface NewPostProps {
  hide: () => void;
}

export default function NewPost({ hide }: NewPostProps) {
  const [count, setCount] = React.useState(0);

  return (
    <Box
      sx={{
        zIndex: 999,
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        bgcolor: "rgba(0, 0, 0, 0.7)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "600px",
          height: "280px",
        }}
      >
        <Box sx={{ display: "flex", mt: "10px" }}>
          <Typography variant="h6" sx={{ ml: "10px" }}>
            Create a new post
          </Typography>
          <IconButton
            aria-label="share"
            sx={{ ml: "auto", mr: "10px" }}
            onClick={hide}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ width: "580px" }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Create a new post"
            multiline
            rows={5}
            fullWidth
            sx={{ m: "10px" }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setCount(event.target.value.length)
            }
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ ml: "10px" }}>
            <Typography variant="caption">{count}/280</Typography>
          </Box>
          <IconButton sx={{ ml: "auto", mr: "10px", mb: "10px" }}>
            <ImageIcon />
          </IconButton>
          <Box sx={{ mr: "10px", mb: "10px" }}>
            <Button disabled={count > 280} variant="contained" type="submit">
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
