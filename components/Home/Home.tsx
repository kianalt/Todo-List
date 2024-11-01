import React, { useEffect, useState } from "react";

// components
import TaskStatus from "../TaskStats/TaskStats";
import TaskList from "../TaskList/TakeList";
import AddTask from "../AddTask/AddTask";
import { Task } from "../../types";
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface HomeProps {
  searchTerm: string;
  openAdd: boolean;
  handleCloseAdd: () => void;
}

const Home: React.FC<HomeProps> = ({ openAdd, handleCloseAdd, searchTerm }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      return Array.isArray(savedTasks) ? savedTasks : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage", error);
      return [];
    }
  });

  const filteredTasks = searchTerm
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tasks;
  console.log(tasks);
  const [open, setOpen] = useState(false);
  const [openEddit, setOpenEddit] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openHash, setOpenHash] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [enteredHash, setEnteredHash] = useState("");
  const [error, setError] = useState("");

  const addTask = (task: Task) => setTasks((prevTasks) => [...prevTasks, task]);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage", error);
    }
  }, [tasks]);

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirm(false);
    setOpenHash(true);
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id: number, status: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const handleSave = () => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? editingTask : task
        )
      );
      handleCloseEddit();
    }
  };

  const handleChange = (field: keyof Task, value: string | number) => {
    if (editingTask) {
      setEditingTask({ ...editingTask, [field]: value });
    }
  };

  const handleOpen = (task: Task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleOpenEddit = (task: Task) => {
    setEditingTask(task);
    setOpenEddit(true);
  };

  const handleCloseEddit = () => {
    setOpenEddit(false);
    setEditingTask(null);
  };

  const handleHashSubmit = () => {
    if (selectedTask && enteredHash === selectedTask.hash) {
      handleDeleteTask(selectedTask.id);
      setOpenHash(false);
      setEnteredHash("");
      setError("");
    } else {
      setError("Invalid task key");
    }
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setOpenHash(false);
    setSelectedTask(null);
    setEnteredHash("");
    setError("");
  };
  const [selectedTaskStatus, setSelectedTaskStatus] = useState<Task | null>(
    null
  );
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  const handleRowClick = (task: Task) => {
    setSelectedTaskStatus(task);
    setOpenStatusDialog(true);
  };
  const handleStatusChange = (field: keyof Task, value: string) => {
    if (selectedTaskStatus) {
      handleUpdateTask(selectedTaskStatus.id, value as Task["status"]);
      setOpenStatusDialog(false);
      setSelectedTaskStatus(null);
    }
  };
  const handleCloseDialog = () => {
    setOpenStatusDialog(false);
    setSelectedTaskStatus(null);
  };
  return (
    <div>
      {tasks.length > 0 && (
        <>
          <TaskStatus tasks={tasks} />
          <TaskList
            tasks={filteredTasks}
            editingTask={editingTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            handleChange={handleChange}
            handleSave={handleSave}
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
            error={error}
            openConfirm={openConfirm}
            openHash={openHash}
            handleConfirmDelete={handleConfirmDelete}
            handleDeleteClick={handleDeleteClick}
            handleHashSubmit={handleHashSubmit}
            enteredHash={enteredHash}
            setEnteredHash={setEnteredHash}
            openEddit={openEddit}
            handleOpenEddit={handleOpenEddit}
            handleCloseEddit={handleCloseEddit}
            openStatusDialog={openStatusDialog}
            handleCloseDialog={handleCloseDialog}
            handleRowClick={handleRowClick}
            handleStatusChange={handleStatusChange}
            selectedTaskStatus={selectedTaskStatus}
          />
        </>
      )}
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="add-task-modal"
        aria-describedby="modal-for-adding-task"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
            width: "400px",
            maxWidth: "90vw",
            borderRadius: 2,
          }}
        >
          <AddTask handleCloseAdd={handleCloseAdd} addTask={addTask} />
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
