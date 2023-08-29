import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventForm from "./components/EventForm";
import EventCard, { EventData } from "./components/EventCard";
import Register from "./components/RegistrationForm";
import RegistrationModal from "./components/RegistrationModal"; // Updated import
import "./components/styles.css";
import DarkModeSwitch from "./components/DarkMode";
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
  Button,
} from "@mui/material";
import { useCountdownFormat } from "./hooks/useCountdownFormat";

function App() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { selectedFormat, setSelectedFormat, countdownFormatOptions } =
    useCountdownFormat();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegister = (username: string, password: string) => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter a valid username or password.");
      return;
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AppContent />} />
      </Routes>
    </Router>
  );

  function AppContent() {
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar position="sticky">
          <Toolbar className="NavBar">
            <img src={logo} width="60px" alt="Logo" />
            <Typography variant="h6" className="title">
              Event Countdown
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <div className="nav-link">
              <Button onClick={() => setIsModalOpen(true)} className="nav-link">
                Register
              </Button>
              <DarkModeSwitch />
            </div>
          </Toolbar>
        </AppBar>
        <RegistrationModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRegister={handleRegister}
        />
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
    );
  }
}

export default App;
