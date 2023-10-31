import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import FloatingWindow from "../containers/floatingWindow";

export interface NewPostProps {
  onClick: () => void;
}

export default function NewPostWindow({ onClick }: NewPostProps) {
  const [count, setCount] = React.useState(0);

  return (
    <FloatingWindow
      height="280px"
      message="Create a new post"
      onClick={onClick}
    >
      <Box>
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
    </FloatingWindow>
  );
}
