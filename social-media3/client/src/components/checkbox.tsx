import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";

export interface FormCheckBoxProps {
  required?: boolean;
  disabled?: boolean;
  label: string;
  defaultChecked?: boolean;
  size?: "small" | number;
}

export function FormCheckbox({
  required,
  disabled,
  label,
  defaultChecked,
  size,
}: FormCheckBoxProps) {
  let checkbox_props = {};
  if (size) {
    if (typeof size === "string") {
      checkbox_props = { size: size };
    } else {
      checkbox_props = { sx: { "& .MuiSvgIcon-root": { fontSize: size } } };
    }
  }
  return (
    <FormControlLabel
      required={required}
      disabled={disabled}
      control={<Checkbox defaultChecked={defaultChecked} {...checkbox_props} />}
      label={label}
    />
  );
}

export interface LoveCheckboxProps {
  defaultChecked?: boolean;
}

export function LoveCheckbox({ defaultChecked }: LoveCheckboxProps) {
  return (
    <Checkbox
      defaultChecked={defaultChecked}
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite />}
      sx={{
        "&.Mui-checked": {
          color: red[600],
        },
      }}
    />
  );
}
