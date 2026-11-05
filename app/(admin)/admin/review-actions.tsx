"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
export function ContributionActions({id,status}:{id:string,status:string}) {
 const [busy,setBusy]=useState(false),[message,setMessage]=useState("");const router=useRouter();
 async function update(action:"receive"|"reject") {
  if(!confirm(action==="receive"?"Confirm that these items have physically been received and can be listed as available?":"Reject this contribution?"))return;
  setBusy(true);setMessage("");
  try {const r=await fetch("/api/admin/contributions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,action})});const j=await r.json();if(!r.ok)throw new Error(j.error||"Update failed");router.refresh();setMessage("Saved");}
  catch(e){setMessage(e instanceof Error?e.message:"Update failed");}finally{setBusy(false);}
 }
 return <div className="space-x-3">{status==="submitted"&&<><button disabled={busy} onClick={()=>update("receive")} className="rounded bg-teal-700 px-4 py-2 text-white">Confirm received</button><button disabled={busy} onClick={()=>update("reject")} className="rounded border px-4 py-2">Reject</button></>}{message&&<p role="status" className="mt-2 text-sm">{message}</p>}</div>;
}
