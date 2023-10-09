import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SetupName() {
  return (
    <Box className="text-center items-center">
      <TextField fullWidth label="Profile Handle" id="profile-handle" />
      <TextField fullWidth label="Display Name" id="display-name" />
    </Box>
  );
}
