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
  FormControl,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useCountdown from "../hooks/useCountdown";
import { Select } from "@mui/material";

export interface EventCardProps {
  event: EventData;
  onEdit: (event: EventData) => void;
  onDelete: (event: EventData) => void;
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
  countdownFormatOptions: { label: string; value: string }[];
}

export interface EventData {
  name: string;
  date: string;
  description: string;
  id: string;
}

function EventCard({
  event,
  onEdit,
  onDelete,
  selectedFormat,
  setSelectedFormat,
  countdownFormatOptions,
}: EventCardProps) {
  console.log("EventCard rendered with selectedFormat:", selectedFormat);
  const countdown = useCountdown(new Date(event.date), selectedFormat);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    console.log("handledSelectChange called with value:", event.target.value);
    setSelectedFormat(event.target.value);
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditedEvent(event);
  };

  const handleSaveEdit = () => {
    setEditedEvent(editedEvent);
    onEdit(editedEvent);
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
      <CardContent className="card-content">
        <Typography variant="h6" className="event-name">
          {event.name}
        </Typography>
        <Typography variant="h5" className="countdown">
          {countdown.formattedCountdown}
        </Typography>
        <Typography variant="body2" className="event-date">
          {event.date}
        </Typography>
        <Typography variant="body2" className="event-description">
          {event.description}
        </Typography>
        <br />

        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(event)}>
          <Delete />
        </IconButton>
        <FormControl>
          <Select value={selectedFormat} onChange={handleSelectChange}>
            {countdownFormatOptions.map((formatOption) => (
              <MenuItem key={formatOption.value} value={formatOption.value}>
                {formatOption.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>

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
