'use client'
import { filterState, sortState } from "@/app/atoms";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import  {useSetRecoilState}  from "recoil";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function ButtonTaskList() {
    const  setFilter = useSetRecoilState(filterState)
    const  setSort = useSetRecoilState(sortState)
    const router = useRouter();
    function onFilterChange(filterValue: string){
        setFilter(filterValue)
    }
    function onSortChange(sortValue: string){
        setSort(sortValue)
    }


    
  return (
    <div className="flex justify-center flex-col">
        <div className="flex justify-center">
            <h3 className="font-semibold text-black-500 text-xl">Your Tasks</h3>
        </div>

    <div className="flex justify-center gap-4 mt-2 ">

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-gray-600 text-white font-semibold p-2 rounded-lg shadow hover:bg-gray-700 transition">
            Filter
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-lg shadow-lg mt-2 p-2">
            <DropdownMenuLabel className="font-bold text-gray-800">Filter By</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-t border-gray-300 my-2" />
            <DropdownMenuItem className="py-2 px-4 hover:bg-blue-100 rounded transition" onClick={()=>{onFilterChange("inprogress")}}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 px-4 hover:bg-green-100 rounded transition" onClick={()=>{onFilterChange("completed")}}>
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 px-4 hover:bg-yellow-100 rounded transition" onClick={()=>{onFilterChange("pending")}}>
              Pending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative inline-block text-left">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-600 text-white font-semibold p-2 rounded-lg shadow hover:bg-gray-700 transition">
              Sort
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-lg shadow-lg mt-2 p-2">
              <DropdownMenuLabel className="font-bold text-gray-800">
               Sort By
              </DropdownMenuLabel>
              <DropdownMenuItem
            
                className="flex items-center py-2 px-4 hover:bg-red-100 rounded transition"
                onClick={()=>{
                    onSortChange("high")
                }}
              >
                High{" "}
                <span className="bg-red-700 w-3 h-3 ml-1 rounded-full"></span>
              </DropdownMenuItem>
              <DropdownMenuItem
              
                className="flex items-center py-2 px-4 hover:bg-orange-100 rounded transition"
                onClick={()=>{
                    onSortChange("medium")
                }}
              >
                Medium{" "}
                <span className="bg-orange-600 w-3 h-3 ml-1 rounded-full"></span>
              </DropdownMenuItem>
              <DropdownMenuItem
          
                className="flex items-center py-2 px-4 hover:bg-yellow-100 rounded transition"
                onClick={()=>{
                    onSortChange("low")
                }}
              >
                Low{" "}
                <span className="bg-yellow-500 w-3 h-3 ml-1 rounded-full"></span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div >
            <Button onClick={()=>{
                router.push('/addtask')
            }}>Add Task</Button>

        </div>
        <div >
            <Button onClick={()=>{
                router.push('/kanbanboard')
            }} className="hidden md:block">View Kanban</Button>

        </div>
        <div >
            <Button onClick={()=>{
               setFilter("");
               setSort("")
            }} className="hidden md:block">View Kanban</Button>

        </div>
    </div>
    </div>
  );
}
