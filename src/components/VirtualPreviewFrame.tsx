"use client";
import {useEffect,useRef,useState,type RefObject} from "react";

export default function VirtualPreviewFrame({mode,frameRef,onLoad}:{mode:"desktop"|"mobile";frameRef:RefObject<HTMLIFrameElement|null>;onLoad:()=>void}){
  const hostRef=useRef<HTMLDivElement>(null);
  const [scale,setScale]=useState(1);
  const virtualWidth=mode==="desktop"?1440:390;
  const virtualHeight=mode==="desktop"?810:693;
  useEffect(()=>{
    const el=hostRef.current;if(!el)return;
    const update=()=>{const available=el.clientWidth;setScale(Math.min(1,available/virtualWidth))};
    update();const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect();
  },[mode,virtualWidth]);
  const visibleWidth=Math.round(virtualWidth*scale);
  const visibleHeight=Math.round(virtualHeight*scale);
  return <div ref={hostRef} className={`cmsV172ViewportHost ${mode}`}>
    <div className="cmsV172ViewportFrame" style={{width:visibleWidth,height:visibleHeight}}>
      <iframe ref={frameRef} title={`Live rate card ${mode} preview`} src="/dashboard/live-preview" onLoad={onLoad} style={{width:virtualWidth,height:virtualHeight,transform:`scale(${scale})`}}/>
    </div>
    <div className="cmsV172ViewportMeta"><span>{mode==="desktop"?"Desktop viewport":"Mobile viewport"}</span><b>{virtualWidth} × {virtualHeight}</b><span>{mode==="desktop"?"16:9":"9:16"}</span></div>
  </div>
}
