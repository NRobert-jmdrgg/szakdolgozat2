import * as React from "react";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface TimelineProps {
  children?: ReactNode | ReactNode[];
}

export default function Timeline({ children }: TimelineProps) {
  if (children) {
    if (Array.isArray(children)) {
      return (
        <Box sx={{ width: "600px" }}>
          {children.map((child) => {
            return child;
          })}
        </Box>
      );
    } else {
      return <Box sx={{ width: "600px" }}>{children}</Box>;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "600px",
        height: "126px",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "blue",
      }}
    >
      <Typography variant="body1">No items</Typography>
    </Box>
  );
}
