import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./components/styles.css";
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
import EventForm from "./components/EventForm";
import EventCard from "./components/EventCard";
import { EventData } from "./components/EventCard";
import { Add } from "@mui/icons-material";
import DarkModeSwitch from "./components/DarkMode";
import logo from "../src/assets/hourglass2_thumbnail.png";
import { useCountdownFormat } from "./hooks/useCountdownFormat";

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

  console.log("App rendered with selectedFormat:", selectedFormat);

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
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar className="NavBar">
          <img src={logo} width="60px" />
          <Typography variant="h6" className="title">
            Event Countdown
          </Typography>
          <DarkModeSwitch />
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
  );
}

export default App;
