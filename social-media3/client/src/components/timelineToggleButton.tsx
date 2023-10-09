import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TimelineToggleButton() {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      sx={{ height: "56px" }}
    >
      <ToggleButton value="left">{"Algorithm"}</ToggleButton>
      <ToggleButton value="right">{"Chronological"}</ToggleButton>
    </ToggleButtonGroup>
  );
}
