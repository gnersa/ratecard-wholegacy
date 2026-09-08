"use client";
import {useEffect,useState} from "react";
import RatecardTemplates from "@/components/ratecard-templates";

type PreviewPayload={profile:any;socials:any[];rates:any[];experiences:any[];terms:any[];theme?:string;colorPattern?:string};

export default function LivePreviewClient(){
  const [data,setData]=useState<PreviewPayload|null>(null);
  useEffect(()=>{
    const onMessage=(event:MessageEvent)=>{
      if(event.origin!==window.location.origin)return;
      if(event.data?.type!=="wholegacy-ratecard-preview")return;
      setData(event.data.payload as PreviewPayload);
    };
    window.addEventListener("message",onMessage);
    window.parent.postMessage({type:"wholegacy-ratecard-preview-ready"},window.location.origin);
    return()=>window.removeEventListener("message",onMessage);
  },[]);
  if(!data)return <main className="cmsLivePreviewLoading">Memuat live preview…</main>;
  return <main className="cmsLivePreviewDocument"><RatecardTemplates profile={data.profile} socials={data.socials||[]} rates={data.rates||[]} experiences={data.experiences||[]} terms={data.terms||[]} theme={data.theme} colorPattern={data.colorPattern}/></main>;
}
