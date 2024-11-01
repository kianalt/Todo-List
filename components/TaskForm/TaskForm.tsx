"use client";

import React, { useState } from "react";
import { Task } from "../../types";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  handleCloseAdd: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, handleCloseAdd }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");
  const [status, setStatus] = useState<
    "TODO" | "DOING" | "DONE" | "WARNING" | "PENDING" | "FAILED"
  >("TODO");
  const [datetime, setDatetime] = useState(
    new Date().toISOString().substring(0, 16)
  );
  const [estimate, setEstimate] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const validateTask = (): boolean => {
    if (!title.trim() || !/^[A-Za-z\s]+$/.test(title)) {
      setError("Title must contain only letters and spaces.");
      return false;
    }
    if (!["LOW", "MEDIUM", "HIGH"].includes(priority)) {
      setError("Priority must be LOW, MEDIUM, or HIGH.");
      return false;
    }
    if (isNaN(new Date(datetime).getTime())) {
      setError("Please provide a valid date and time.");
      return false;
    }
    if (estimate < 0) {
      setError("Estimate hours must be a positive number.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous error messages
    if (validateTask()) {
      const newTask: Task = {
        id: Date.now(),
        title,
        priority,
        status,
        datetime: new Date(datetime),
        estimate,
        hash: Math.random().toString(36).substring(2, 7),
      };
      onAddTask(newTask);
      setTitle("");
      setDatetime(new Date().toISOString().substring(0, 16));
      setEstimate(0);
      handleCloseAdd();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Task Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
          }
        >
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as
                | "TODO"
                | "DOING"
                | "DONE"
                | "WARNING"
                | "PENDING"
                | "FAILED"
            )
          }
        >
          <MenuItem value="TODO">TODO</MenuItem>
          <MenuItem value="DOING">DOING</MenuItem>
          <MenuItem value="DONE">DONE</MenuItem>
          <MenuItem value="WARNING">WARNING</MenuItem>
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="FAILED">FAILED</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Date & Time"
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Estimate Hours"
        type="number"
        value={estimate}
        onChange={(e) => setEstimate(parseInt(e.target.value))}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
