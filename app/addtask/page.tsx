"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select,   SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast"

// import { useRouter } from 'next/navigation'
import axios from  'axios'
import { useEffect, useState } from "react";



  interface TaskInputs  {
    taskname: string,
    priority: string,
    status: string

  }




export default function SignInForm(): JSX.Element {
  // const router = useRouter();
  const [priorityValue, setPriorityValue] = useState("")
  const [statusValue, setStatusValue] = useState("");
 

  const [token, setToken] = useState<string | null>(null); // Allow null

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); // Now this works because token can be null
  }, []);

const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: {  },
  } = useForm<TaskInputs>();


  const onSubmit: SubmitHandler<TaskInputs> = async (data) => {

    try {
     await axios.post('https://kanban-todo-backend.onrender.com/api/v1/task/add', {
          taskname: data.taskname,
          priority: priorityValue,
          status: statusValue
      },{
        headers:{
            Authorization: `Bearer ${token}`
        }
      });

     toast({
        description: "Task Added",
        duration: 5000
      })
  } catch (error) {
      console.error('Error during adding task', error);
  }
  };


  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-8 border rounded shadow-lg bg-white w-full max-w-xs md:w-3/12 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2"
        >
          <div className="font-bold bg-black-600 flex justify-center ">
            <h3>Add Your Task</h3>
          </div>
          <div className="flex justify-center  ">
            <Input
            unusedproperty=""
              type="text"
              placeholder="Enter Your Task"
              {...register("taskname", { required: "task is required" })}
              className="w-full"
            />
          </div>
         <div>
         <Select onValueChange={(value)=> setStatusValue(value)} >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="completed" >Completed</SelectItem>
          <SelectItem value="inprogress">In Progress</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
         </div>
         <div>
         <Select onValueChange={(value)=> setPriorityValue(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="high" >High</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
         </div>
         
       
          
          <div className="flex justify-center">
            <Button type="submit" className="justify-center w-9/12">
              Add Task
            </Button>
          </div>
        </form>
      
      </div>
    </div>
  );
}