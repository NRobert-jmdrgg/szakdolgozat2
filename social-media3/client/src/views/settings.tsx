import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Settings() {
  return (
    <Container sx={{ width: "1200px" }}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <FormControlLabel label="Dark mode" control={<Switch />} />
      </Box>
    </Container>
  );
}
