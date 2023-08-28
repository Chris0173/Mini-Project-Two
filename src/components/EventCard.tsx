import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useCountdown from "../hooks/useCountdown";

export interface EventCardProps {
  event: EventData;
  onEdit: (event: EventData) => void;
  onDelete: (event: EventData) => void;
}

export interface EventData {
  name: string;
  date: string;
  description: string;
  id: string;
}

function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const { days, hours, minutes, seconds } = useCountdown(new Date(event.date));

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditedEvent(event); // Reset edited event
  };

  const handleSaveEdit = () => {
    setEditedEvent(editedEvent); // Update local state first
    onEdit(editedEvent); // Call onEdit with edited event data
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (fieldName: keyof EventData, value: string) => {
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [fieldName]: value,
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{event.name}</Typography>
        <Typography variant="body2">{event.date}</Typography>
        <Typography variant="body2">{event.description}</Typography>
        <br />
        <Typography variant="h5" align="left">
          {days}d {hours}h {minutes}m {seconds}s
        </Typography>{" "}
        {/* Display countdown */}
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(event)}>
          <Delete />
        </IconButton>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Name"
            value={editedEvent.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Event Date"
            type="datetime-local"
            value={editedEvent.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            fullWidth
          />
          <TextField
            label="Event Description"
            value={editedEvent.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default EventCard;
