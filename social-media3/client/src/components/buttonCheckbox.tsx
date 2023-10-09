import * as React from "react";
import Button from "@mui/material/Button";

export interface ButtonCheckboxProps {
  active?: boolean;
  label: string;
}

export function ButtonCheckbox({ active, label }: ButtonCheckboxProps) {
  const [checked, setChecked] = React.useState(active ?? false);

  return (
    <Button
      variant={checked ? "contained" : "outlined"}
      onClick={() => setChecked(!checked)}
    >
      {label}
    </Button>
  );
}
