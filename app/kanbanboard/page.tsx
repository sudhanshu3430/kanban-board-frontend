"use client";

import KanbanBoardCard from "@/components/kanbanboardcard";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

interface Tasks {
  _id: string;
  taskname: string;
  priority: string;
  status: Status;
}
type Status = 'pending' | 'inprogress' | 'completed';
interface Columns {
  [key: string]: Tasks[]; // Index signature to allow dynamic keys
}
const initialColumns: Columns = {
  pending: [],
  inprogress: [],
  completed: [],
};

export default function KanbanBoard() {
  // const [alltasks, setAllTasks] = useState<Tasks[]>([]);
  const [columns, setColumns] = useState<Columns>(initialColumns);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        "https://kanban-todo-backend.onrender.com/api/v1/task/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setAllTasks(response.data.tasks);
      const newColumns = { ...initialColumns };

      response.data.tasks.forEach((task: Tasks) => {
        // Check if task already exists in the column
        if (newColumns[task.status]) {
          const taskExists = newColumns[task.status].some(t => t._id === task._id);
          if (!taskExists) {
            newColumns[task.status].push(task);
          }
        } else {
          console.warn(`Task with status ${task.status} does not match any column.`);
        }
      });

      // Set the new columns state
      setColumns(newColumns);
      console.log("Updated columns:", newColumns);
    }
    fetchTasks();
  },[token]);

  const handleDragEnd = async (result:DropResult) => {
    console.log("Drag result:", result);
    const { destination, source } = result;
  
    // Check if destination is valid and it's not the same position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
  
    const draggedTaskId = columns[source.droppableId][source.index]._id;
    const newColumn = destination.droppableId as Status;
  
    // Create a new object to avoid mutating state directly
    const updatedColumns = { ...columns };
  
    // Remove the task from the original column
    const [movedTask] = updatedColumns[source.droppableId].splice(source.index, 1);
  
    // Add the task to the new column
    updatedColumns[newColumn].splice(destination.index, 0, movedTask);
  
    // Update the state
    setColumns(updatedColumns);
  
    // Prepare the update request
    const fetchBody = {
      taskId: draggedTaskId,
      status: newColumn,
    };
    
    // Make the API call
    await axios.put("https://kanban-todo-backend.onrender.com/api/v1/task/update", fetchBody);
    toast({
      description: "Status Updated"
    })
  };

  return (<div>
<DragDropContext onDragEnd={handleDragEnd}>
  <div className="flex justify-between gap-1 w-full">
    {Object.keys(columns).map((columnId) => (
      <Droppable key={columnId} droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-2 mb-2 rounded shadow w-full h-[80vh] overflow-y-auto mt-3 bg-yellow-100 justify-start"// Change background color when dragging over
          >
            <h2 className="text-lg font-semibold">
              {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
            </h2>
            {columns[columnId as Status].map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className= "p-2 mb-2 rounded shadow" // Change color while dragging the task
                  >
                    <KanbanBoardCard
                      taskName={task.taskname}
                      taskId={task._id}
                      status={task.status}
                      priority={task.priority}
                   // Pass the dragging state of the task
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ))}
  </div>
</DragDropContext>

  </div>);
}
