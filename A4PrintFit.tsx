"use client";
import {useEffect} from "react";

export default function A4PrintFit(){
  useEffect(()=>{
    let ro:ResizeObserver|undefined;
    let raf=0;
    const fit=()=>{
      const el=document.querySelector<HTMLElement>(".rc172ThemeMount");
      if(!el)return;
      const rect=el.getBoundingClientRect();
      const width=Math.max(el.scrollWidth,rect.width,1);
      const height=Math.max(el.scrollHeight,rect.height,1);
      const pxPerMm=96/25.4;
      const targetW=194*pxPerMm;
      const targetH=281*pxPerMm;
      const scale=Math.min(1,targetW/width,targetH/height);
      el.style.setProperty("--a4-fit-scale",String(scale));
      el.style.setProperty("--a4-source-width",`${width}px`);
    };
    const connect=()=>{
      fit();
      const el=document.querySelector<HTMLElement>(".rc172ThemeMount");
      if(el&&typeof ResizeObserver!=="undefined"){
        ro=new ResizeObserver(()=>fit());
        ro.observe(el);
      }
    };
    raf=requestAnimationFrame(connect);
    window.addEventListener("beforeprint",fit);
    return()=>{cancelAnimationFrame(raf);ro?.disconnect();window.removeEventListener("beforeprint",fit)};
  },[]);
  return null;
}
