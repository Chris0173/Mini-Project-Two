import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4" align="center">
            Event Countdown
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Current Events:
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Countdown component goes here */}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Event details or other content goes here */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
