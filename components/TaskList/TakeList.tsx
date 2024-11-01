import React, { useState } from "react";
import { Task } from "../../types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  IconButton,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const formatEstimate = (estimate: number) => {
  if (estimate < 8) return `${estimate}h`;
  if (estimate % 160 === 0) return `${estimate / 160}m`;
  if (estimate % 40 === 0) return `${estimate / 40}w`;
  if (estimate % 8 === 0) return `${estimate / 8}d`;
  return `${estimate}h`;
};

interface TaskListProps {
  tasks: Task[];
  open: boolean;
  openConfirm: boolean;
  openHash: boolean;
  openEddit: boolean; // Add this line
  editingTask: Task | null;
  enteredHash: string;
  error: string;
  openStatusDialog: boolean;
  selectedTaskStatus: Task | null;
  onDeleteTask: (id: number) => void;
  onUpdateTask: (id: number, status: Task["status"]) => void;
  handleOpen: (task: Task) => void;
  handleClose: () => void;
  handleSave: () => void;
  handleDeleteClick: (task: Task) => void;
  handleConfirmDelete: () => void;
  handleHashSubmit: () => void;
  handleChange: (field: keyof Task, value: string | number) => void;
  setEnteredHash: (hash: string) => void;
  handleOpenEddit: (task: Task) => void;
  handleCloseEddit: () => void;
  handleCloseDialog: () => void;
  handleStatusChange: (field: keyof Task, value: string) => void;
  handleRowClick: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  open,
  openConfirm,
  openHash,
  editingTask,
  enteredHash,
  error,
  onDeleteTask,
  onUpdateTask,
  handleOpen,
  handleClose,
  handleSave,
  handleDeleteClick,
  handleConfirmDelete,
  handleHashSubmit,
  handleChange,
  setEnteredHash,
  handleOpenEddit,
  handleCloseEddit,
  openEddit,
  openStatusDialog,
  handleCloseDialog,
  selectedTaskStatus,
  handleRowClick,
  handleStatusChange,
}) => {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterEstimate, setFilterEstimate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        (!filterPriority || task.priority === filterPriority) &&
        (!filterEstimate || task.estimate.toString() === filterEstimate) &&
        (!filterStatus || task.status === filterStatus)
    )
    .sort((a, b) => {
      const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        pt: "50px",
      }}
    >
      {/* Filter Controls */}
      <Box display="flex" gap={2} mb={2} width="100%" maxWidth="1100px">
        <TextField
          label="Filter by Title"
          variant="outlined"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          fullWidth
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Filter by Priority</InputLabel>
          <Select
            label="Filter by Priority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Filter by Estimate"
          variant="outlined"
          type="number"
          value={filterEstimate || ""}
          onChange={(e) => setFilterEstimate(e.target.value)}
          fullWidth
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="DOING">DOING</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="WARNING">WARNING</MenuItem>
            <MenuItem value="FAILED">FAILED</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1100, borderRadius: 3, boxShadow: 3, padding: "20px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Estimate</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow
                key={task.id}
                hover
                onClick={() => handleRowClick(task)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.datetime.toLocaleString()}</TableCell>
                <TableCell>{formatEstimate(task.estimate)}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenEddit(task);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteClick(task);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Popup */}
      <Modal open={openConfirm} onClose={handleClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: 300,
          }}
        >
          <Typography variant="h6">
            Are you sure you want to delete this task?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Hash Entry Popup */}
      <Modal open={openHash} onClose={handleClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: 300,
          }}
        >
          <Typography variant="h6">Please enter the task key:</Typography>
          <TextField
            fullWidth
            value={enteredHash}
            onChange={(e) => setEnteredHash(e.target.value)}
            margin="normal"
            error={Boolean(error)}
            helperText={error}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleHashSubmit}
            >
              Delete
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
      <Modal open={openEddit} onClose={handleCloseEddit}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: 400,
            outline: "none",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Task
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={editingTask?.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              value={editingTask?.priority || ""}
              onChange={(e) =>
                handleChange(
                  "status",
                  e.target.value as "LOW" | "MEDIUM" | "HIGH"
                )
              }
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Estimate"
            type="number"
            value={editingTask?.estimate || ""}
            onChange={(e) => handleChange("estimate", +e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={editingTask?.status || ""}
              label="Status"
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="DOING">DOING</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
              <MenuItem value="PENDING">PENDING</MenuItem>
              <MenuItem value="WARNING">WARNING</MenuItem>
              <MenuItem value="FAILED">FAILED</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleCloseEddit}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
      {/* Status Update Dialog */}
      <Modal open={openStatusDialog} onClose={handleCloseDialog}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: 300,
          }}
        >
          <Typography variant="h6">Change Task Status</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedTaskStatus?.status || ""}
              onChange={(e) =>
                handleStatusChange("status", e.target.value as Task["status"])
              }
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="DOING">DOING</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
              <MenuItem value="PENDING">PENDING</MenuItem>
              <MenuItem value="WARNING">WARNING</MenuItem>
              <MenuItem value="FAILED">FAILED</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default TaskList;
