"use client";

import React, { useState } from "react";
import { Task } from "../../types";
import TaskForm from "../../components/TaskForm/TaskForm";

interface TaskFormProps {
  handleCloseAdd: () => void;
  addTask: (task: Task) => void;
}

const AddTaskPage: React.FC<TaskFormProps> = ({ handleCloseAdd, addTask }) => {
  return (
    <div>
      <h2 style={{ color: "#fff" }}>Add New Task</h2>
      <TaskForm onAddTask={addTask} handleCloseAdd={handleCloseAdd} />
    </div>
  );
};

export default AddTaskPage;
