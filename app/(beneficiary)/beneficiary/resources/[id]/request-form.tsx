"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function RequestResourceForm({resourceId}:{resourceId:string}) {
  const [description,setDescription]=useState("");
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const router=useRouter();
  async function submit(e:React.FormEvent) {
    e.preventDefault();setBusy(true);setError("");
    try {
      const response=await fetch("/api/assistance-requests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({resource_id:resourceId,description})});
      const result=await response.json();
      if(!response.ok) throw new Error(result.error||"Unable to submit request");
      router.push("/beneficiary/requests");router.refresh();
    } catch(err) {setError(err instanceof Error?err.message:"Request failed");}
    finally {setBusy(false);}
  }
  return <form onSubmit={submit} className="space-y-4 rounded-2xl border p-5">
    <label className="block font-semibold">Why do you need this resource?</label>
    <textarea value={description} onChange={e=>setDescription(e.target.value)} maxLength={2000} required className="w-full rounded-lg border p-3 text-slate-900" rows={4}/>
    {error&&<p role="alert" className="text-red-600">{error}</p>}
    <button disabled={busy} className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white disabled:opacity-50">{busy?"Submitting...":"Request this resource"}</button>
  </form>;
}
