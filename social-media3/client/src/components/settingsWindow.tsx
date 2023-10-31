import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FloatingWindow from "../containers/floatingWindow";

export interface SettingsWindowProps {
  onClick: () => void;
  message: string;
}

export default function SettingsWindow({
  message,
  onClick,
}: SettingsWindowProps) {
  return (
    <FloatingWindow message={message} onClick={onClick}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <FormControlLabel label="Dark mode" control={<Switch />} />
      </Box>
    </FloatingWindow>
  );
}
