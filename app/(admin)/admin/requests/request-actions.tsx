"use client";
import {useState} from "react";import {useRouter} from "next/navigation";
export function RequestActions({id,status}:{id:string,status:string}){
 const [busy,setBusy]=useState(false),[message,setMessage]=useState("");const router=useRouter();
 async function update(action:"approve"|"reject"|"complete"){
  if(!confirm(`Confirm ${action}?`))return;setBusy(true);setMessage("");
  try{const r=await fetch("/api/admin/requests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,action})});const j=await r.json();if(!r.ok)throw new Error(j.error||"Failed");router.refresh();setMessage("Saved");}
  catch(e){setMessage(e instanceof Error?e.message:"Failed");}finally{setBusy(false);}
 }
 return <div className="space-x-2">{status==="pending_review"&&<><button disabled={busy} onClick={()=>update("approve")} className="rounded bg-teal-700 px-4 py-2 text-white">Approve</button><button disabled={busy} onClick={()=>update("reject")} className="rounded border px-4 py-2">Reject</button></>}
 {status==="approved"&&<button disabled={busy} onClick={()=>update("complete")} className="rounded bg-teal-700 px-4 py-2 text-white">Confirm distribution</button>}{message&&<p role="status">{message}</p>}</div>;
}
