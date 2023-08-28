import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import routes from "./routes";
import EventForm from "./components/EventForm";
import EventCard from "./components/EventCard";
import { EventData } from "./components/EventCard";
import "./components/styles.css";
import DarkModeSwitch from "./components/DarkMode";
import { useCountdownFormat } from "./hooks/useCountdownFormat";
import logo from "../src/assets/hourglass2_thumbnail.png";
import { Add } from "@mui/icons-material";
import {
  Container,
  Grid,
  Fab,
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { selectedFormat, setSelectedFormat, countdownFormatOptions } =
    useCountdownFormat();

  const handleAddEvent = (event: EventData) => {
    // Add an ID property to the event before saving it
    const eventWithId = { ...event, id: uuidv4() };
    setEvents([...events, eventWithId]);
  };

  const handleEditEvent = (editedEvent: EventData) => {
    const updatedEvents = events.map((event) =>
      event.id === editedEvent.id ? editedEvent : event
    );
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (eventToDelete: EventData) => {
    setEvents(events.filter((event) => event !== eventToDelete));
  };

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="sticky">
          <Toolbar className="NavBar">
            <img src={logo} width="60px" alt="Logo" />
            <Typography variant="h6" className="title">
              Event Countdown
            </Typography>
            <div style={{ flexGrow: 1 }} /> {/* Spacer */}
            <div className="nav-link">
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <DarkModeSwitch />
            </div>
          </Toolbar>
        </AppBar>
        <br />
        <Container>
          <Grid container spacing={2}>
            {events.map((event, index) => (
              <Grid item xs={12} key={index}>
                <EventCard
                  selectedFormat={selectedFormat}
                  setSelectedFormat={setSelectedFormat}
                  countdownFormatOptions={countdownFormatOptions}
                  event={event}
                  onDelete={handleDeleteEvent}
                  onEdit={handleEditEvent}
                />
              </Grid>
            ))}
          </Grid>
          <Fab
            color="primary"
            aria-label="Add Event"
            onClick={() => setIsFormOpen(true)}
            style={{ position: "fixed", bottom: "20px", right: "20px" }}
          >
            <Add />
          </Fab>
          <EventForm
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleAddEvent}
          />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
