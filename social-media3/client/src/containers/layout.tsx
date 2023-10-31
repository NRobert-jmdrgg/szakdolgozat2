import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LeftSidebar from "../views/leftSidebar";
import RightSidebar from "../views/rigthSidebar";

export interface LayoutProps {
  children?: ReactNode;
  setShowNewPostWindow: () => void;
}

export default function Layout({
  children,
  setShowNewPostWindow,
}: LayoutProps) {
  return (
    <Container disableGutters sx={{ zIndex: 1, position: "relative" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <LeftSidebar trends={[]} />
        <Box sx={{ bgcolor: "green", width: "600px" }}>{children}</Box>
        <RightSidebar setShowNewPostMenu={setShowNewPostWindow} />
      </Box>
    </Container>
  );
}
