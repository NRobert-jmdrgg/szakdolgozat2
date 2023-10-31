import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export interface FloatingWindowProps {
  children: ReactNode;
  onClick: () => void;
  message: string;
  width?: string;
  height?: string;
}

export default function FloatingWindow({
  children,
  width,
  height,
  onClick,
  message,
}: FloatingWindowProps) {
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
          width: width ?? "600px",
          height: height,
        }}
      >
        <Box sx={{ display: "flex", mt: "10px" }}>
          <Typography variant="h6" sx={{ ml: "10px" }}>
            {message}
          </Typography>
          <IconButton
            aria-label="close"
            sx={{ ml: "auto", mr: "10px" }}
            onClick={onClick}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
