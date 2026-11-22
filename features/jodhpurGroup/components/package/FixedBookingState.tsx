"use client";
import { createContext, useContext, useState } from "react";
const Context=createContext<{city:string;date:string;adults:number;setAdults:(n:number)=>void;setCity:(s:string)=>void;setDate:(s:string)=>void}|null>(null);
export function FixedBookingProvider({children}:{children:React.ReactNode}){const[city,setCity]=useState("Delhi"),[date,setDate]=useState(""),[adults,setAdults]=useState(1);return <Context.Provider value={{city,date,adults,setAdults,setCity,setDate}}>{children}</Context.Provider>}
export function useFixedBooking(){return useContext(Context);}
