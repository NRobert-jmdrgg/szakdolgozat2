import * as React from "react";
import Layout from "./containers/layout";
import Box from "@mui/material/Box";
import NewPostWindow from "./components/newPostWindow";
import LoginWindow from "./components/loginWindow";
import SettingsWindow from "./components/settingsWindow";
import { Outlet } from "react-router-dom";

export default function App() {
  const [showNewPostWindow, setShowNewPostWindow] = React.useState(false);
  const [showLoginWindow, setShowLoginWindow] = React.useState(false);
  const [showSettingsWindow, setShowSettingsWindow] = React.useState(false);
  const [loginPopupMessage, setLoginPopupMessage] = React.useState("");

  return (
    <Box>
      <Layout setShowNewPostWindow={setShowNewPostWindow}>
        <Outlet />
      </Layout>
      {showSettingsWindow && (
        <SettingsWindow
          message="Settings"
          onClick={() => setShowSettingsWindow(false)}
        />
      )}
      {showNewPostWindow && (
        <NewPostWindow onClick={() => setShowNewPostWindow(false)} />
      )}
      {showLoginWindow && (
        <LoginWindow
          message={loginPopupMessage}
          onClick={() => setShowLoginWindow(false)}
        />
      )}
    </Box>
  );
}
