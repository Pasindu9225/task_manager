// src/app/HomeScreen.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/TaskCard";
import { Priority } from "../app/types"; // Adjust the path as needed

interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  createdAt: Date;
}

const HomeScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  // Fetch tasks from API
  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
      }
    };

    getTasks();
  }, []);

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    // You can also call an API to remove the task from the database here
  };

  const updateTaskDescription = (id: number, newDescription: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
    // Optionally, call an API to update the task in the database
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onRemove={removeTask}
            onUpdateDescription={updateTaskDescription}
            isEditing={editingTaskId === task.id}
            setEditingTaskId={setEditingTaskId}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          // Logic to add a new task can go here
        }}
        className="mt-4"
      >
        Add Task
      </Button>
    </div>
  );
};

export default HomeScreen;
