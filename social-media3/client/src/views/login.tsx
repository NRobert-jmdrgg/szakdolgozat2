import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FirstLogin from "../components/firstLogin";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Container>
      <Box>
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Login
        </Button>
      </Box>
      {/* check if a users display name and handle name is set*/}
      <Box>
        <FirstLogin />
      </Box>
    </Container>
  );
}
