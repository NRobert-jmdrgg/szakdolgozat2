import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";
import FloatingWindow from "../containers/floatingWindow";

interface LoginWindowProps {
  message: string;
  onClick: () => void;
}

export default function LoginWindow({ message, onClick }: LoginWindowProps) {
  const { loginWithRedirect } = useAuth0();
  return (
    <FloatingWindow message={message} onClick={onClick}>
      <Box>
        <Button
          variant="contained"
          sx={{ mb: "10px" }}
          onClick={() => loginWithRedirect()}
        >
          Login
        </Button>
      </Box>
    </FloatingWindow>
  );
}
