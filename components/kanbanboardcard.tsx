"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import axios from "axios";
// import { useRecoilState } from "recoil";
// import { retreive } from "@/app/atoms";
import { toast } from "@/hooks/use-toast";

interface TaskListProps {
  taskId: string;
  taskName: string;
  priority: string;
  status: string;

}

export default function KanbanBoardCard({
  taskName,
  priority,
  status,
  taskId,

}: TaskListProps) {
  const [newPriority, setNewPriority] = useState(priority);
  const [newStatus, setNewStatus] = useState(status);
//   const [rerender, setRerender] = useRecoilState(retreive);

  async function handleStatusChange(statusValue: string) {
    setNewStatus(statusValue);
    const statusBody ={
        taskId: taskId,
        status: newStatus
    }
    await axios.put("https://kanban-todo-backend.onrender.com/api/v1/task/update", statusBody);
    toast({
        description:"Status Updated"
    })
  }

  async function handlePriorityChange(priorityValue: string) {
    setNewPriority(priorityValue);
    await axios.put("https://kanban-todo-backend.onrender.com/api/v1/task/update", {
      taskId: taskId,
      priority: newPriority,
    });
    toast({
        description:"Priority Updated"
    })
  }

  async function handleDelete() {
    try {
      await axios.delete(`https://kanban-todo-backend.onrender.com/api/v1/task/delete/?taskId=${taskId}`);
    //   setRerender(taskId);
      toast({
        description: "delete success"
      })

      // Remove the task from the state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className="border-2 border-solid p-2 m-1 border-black rounded-md bg-cyan-100 ">
      <div>
        <p className="text-lg font-semibold text-gray-800 mb-2">{taskName}</p>
      </div>
      <div className="flex space-x-4 justify-between">
        <div>
          <div className="relative inline-block text-left mr-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-gray-600 text-white font-semibold p-1 rounded-lg shadow hover:bg-gray-700 transition">
                Update Status
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-lg shadow-lg mt-2 p-2">
                <DropdownMenuLabel className="font-bold text-gray-800">
                  {newStatus || "Select Status"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-t border-gray-300 my-2" />
                <DropdownMenuItem
                  onClick={() => {
                    handleStatusChange("inprogress");
                  }}
                  className="py-2 px-4 hover:bg-blue-100 rounded transition"
                >
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleStatusChange("completed");
                  }}
                  className="py-2 px-4 hover:bg-green-100 rounded transition"
                >
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleStatusChange("pending");
                  }}
                  className="py-2 px-4 hover:bg-yellow-100 rounded transition"
                >
                  Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative inline-block text-left">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-gray-600 text-white font-semibold p-1 rounded-lg shadow hover:bg-gray-700 transition">
                Change Priority
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-lg shadow-lg mt-2 p-2">
                <DropdownMenuLabel className="font-bold text-gray-800">
                  {newPriority || "Select Priority"}
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    handlePriorityChange("high");
                  }}
                  className="flex items-center py-2 px-4 hover:bg-red-100 rounded transition"
                >
                  High{" "}
                  <span className="bg-red-700 w-3 h-3 ml-1 rounded-full"></span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handlePriorityChange("medium");
                  }}
                  className="flex items-center py-2 px-4 hover:bg-orange-100 rounded transition"
                >
                  Medium{" "}
                  <span className="bg-orange-600 w-3 h-3 ml-1 rounded-full"></span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handlePriorityChange("low");
                  }}
                  className="flex items-center py-2 px-4 hover:bg-yellow-100 rounded transition"
                >
                  Low{" "}
                  <span className="bg-yellow-500 w-3 h-3 ml-1 rounded-full"></span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <Button variant="outline" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
