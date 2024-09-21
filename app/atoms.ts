"use client"
import { atom } from "recoil";

export const filterState = atom({
    key: 'filterState', 
    default: '', 
  });

  export const sortState = atom({
    key:"sortState",
    default:""
  })

  export const retreive = atom({
    key:"retreive",
    default:""
  })

  export const signoutstate = atom({
    key:"signout ",
    default:false
  })