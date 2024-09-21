"use client";
import TaskListCard from "@/components/tasklistCard";
import {  useRecoilValue } from "recoil";
import { filterState, retreive, sortState } from "../atoms";
import { useEffect, useState } from "react";
import axios from "axios";

interface TasksType {
  taskname: string;
  _id: string;
  priority: string;
  status: string;
}

export default function TaskList() {
  const filterValue = useRecoilValue(filterState);
  const sortValue = useRecoilValue(sortState);
  const [allTasks, setAllTasks] = useState<TasksType[]>([]); // Ensure allTasks is initialized as an empty array
  const reRender = useRecoilValue(retreive)

   const [token, setToken] = useState<string | null>(null); // Allow null

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken)
    setToken(storedToken); // Now this works because token can be null
  }, []);
  console.log(filterValue, sortValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://kanban-todo-backend.onrender.com/api/v1/task/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Ensure response.data.tasks is defined and an array
        setAllTasks(response.data.tasks || []); // Use an empty array if tasks is undefined
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, reRender]);

  useEffect(() => {
    const filterList = async () => {
      const bodyData = {
        status: filterValue,
        priority: sortValue,
      };
      try {
        const response = await axios.post("https://kanban-todo-backend.onrender.com/api/v1/task/filter", bodyData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Ensure response.data.tasks is defined and an array
        setAllTasks(response.data.sortedTasks); // Use an empty array if tasks is undefined
      } catch (error) {
        console.error("Error filtering tasks:", error);
      }
    };

    filterList();
  }, [filterValue, sortValue]);

  

  return (
    <div className="bg-slate h-[70vh] flex justify-center mt-5">
      <div className="flex flex-col w-[100vh] mb-5 px-5 justify-start m-auto h-full overflow-y-auto">
        {allTasks.length > 0 ? (
          allTasks.map((task: TasksType) => (
            <TaskListCard
              key={task._id} // Use _id as a unique key
              taskName={task.taskname}
              taskId={task._id}
              status={task.status}
              priority={task.priority}
              
            />
          ))
        ) : (
          <p>No tasks available</p> // Optional: Message when no tasks are found
        )}
      </div>
    </div>
  );
}
