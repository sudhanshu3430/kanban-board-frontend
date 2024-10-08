"use client"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signoutstate } from '../app/atoms';
import { useRecoilState } from "recoil";

export function AppBar(){
    const [token, setToken] = useState("");
    const router = useRouter();
    const [signState, setSignState] = useRecoilState(signoutstate)

    setInterval(async () => {
        const response = await axios.get("https://kanban-todo-backend.onrender.com/hit");
        console.log({ response });
    }, 240000);
    
    useEffect(()=>{
        const token = localStorage.getItem("token") || " ";
        setToken(token);
        alert("Please note that the backend is hosted on free server wait for 20s while sending a request or just retry it 4-5 times to activate the backend")
        
    }, [token, signState])
    return <div className="border-b-2 border-solid border-black p-4 flex justify-between">
        <div >
        <h3 className="text-l font-bold">Kanban Todo</h3>
        </div>
        <div >
            {token && signState ? 
            <div>
                <div className="inline mx-1"><Button onClick={()=>{
                     localStorage.removeItem('token');
                     router.push('/'); 
                     setSignState(false)   
                }}>Sign Out</Button></div>
                <div className="inline mx-1"><Button onClick={()=>{
                    router.push('/tasklist')
                   
                }}>View List</Button></div>
            </div> :<div></div>
}
            

        </div>
     

    </div>
}