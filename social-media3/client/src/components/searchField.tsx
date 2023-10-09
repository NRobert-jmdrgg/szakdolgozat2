import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchFieldProps {
  width: number;
}

export default function SearchField({ width }: SearchFieldProps) {
  // TODO: autocomplete
  return (
    <Box
      sx={{
        width: width,
        backgroundColor: "primary.dark",
      }}
    >
      <TextField
        fullWidth
        hiddenLabel
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
