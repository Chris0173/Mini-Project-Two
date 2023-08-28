// DarkModeSwitch.tsx
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";

export default function DarkModeSwitch() {
  const [mode, setMode] = React.useState("light");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch
        checked={mode === "dark"}
        onChange={() =>
          setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
        }
      />
    </ThemeProvider>
  );
}
