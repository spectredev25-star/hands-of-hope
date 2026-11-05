import { createClient } from "@/libs/supabase/server";
import { RequestActions } from "./request-actions";
export default async function AdminRequests() {
 const supabase=await createClient();const {data,error}=await supabase.from("assistance_requests")
  .select("id,title,category,status,description,submitted_at")
  .order("submitted_at",{ascending:false}).limit(100);
 return <div className="space-y-5"><h1 className="text-3xl font-bold">Beneficiary requests</h1>
 {error&&<p className="text-red-600">{error.message}</p>}
 {(data??[]).map(r=><article key={r.id} className="space-y-2 rounded-xl border bg-white p-5"><h2 className="font-semibold">{r.title}</h2>
 <p>{r.category} · {r.status}</p><p>{r.description}</p><RequestActions id={r.id} status={r.status}/></article>)}
 {!error&&!data?.length&&<p>No requests yet.</p>}</div>;
}
