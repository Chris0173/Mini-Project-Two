// EventForm.js
import { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: EventData) => void;
}

interface EventData {
  name: string;
  date: string;
  description: string;
}

function EventForm({ open, onClose, onSubmit }: EventFormProps) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleSubmit = () => {
    onSubmit({
      name: eventName,
      date: eventDate,
      description: eventDescription,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          fullWidth
          multiline
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventForm;
