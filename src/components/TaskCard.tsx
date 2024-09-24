// components/TaskCard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Priority } from "../app/types"; // Adjust the path as needed
import { X } from "lucide-react"; // Make sure to import X

const priorityColors: Record<Priority, string> = {
  low: "bg-green-100 border-green-300",
  medium: "bg-yellow-100 border-yellow-300",
  high: "bg-red-100 border-red-300",
};

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    createdAt: Date;
  };
  onRemove: (id: number) => void;
  onUpdateDescription: (id: number, newDescription: string) => void;
  isEditing: boolean;
  setEditingTaskId: (id: number | null) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onRemove,
  onUpdateDescription,
  isEditing,
  setEditingTaskId,
}) => {
  return (
    <Card className={`aspect-square ${priorityColors[task.priority]}`}>
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{task.title}</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onRemove(task.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {isEditing ? (
          <Textarea
            value={task.description}
            onChange={(e) => onUpdateDescription(task.id, e.target.value)}
            onBlur={() => setEditingTaskId(null)}
            autoFocus
            className="text-sm mb-2 flex-grow"
          />
        ) : (
          <p
            className="text-sm mb-2 cursor-pointer flex-grow line-clamp-4"
            onClick={() => setEditingTaskId(task.id)}
          >
            {task.description}
          </p>
        )}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <span>
            Priority:{" "}
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span>{format(task.createdAt, "h:mm a")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
