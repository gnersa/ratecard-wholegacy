"use client";
import {useEffect} from "react";
export default function AutoPrint(){useEffect(()=>{const q=new URLSearchParams(window.location.search);if(q.get("autoprint")==="1"){const id=window.setTimeout(()=>window.print(),450);return()=>window.clearTimeout(id)}},[]);return null}
