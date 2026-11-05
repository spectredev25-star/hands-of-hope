import { createClient } from "@/libs/supabase/server";
import { ContributionActions } from "./review-actions";
export default async function AdminPage() {
 const supabase=await createClient();
 const {data,error}=await supabase.from("contributions")
  .select("id,item_name,category,quantity,unit,status,pickup_address,created_at")
  .order("created_at",{ascending:false}).limit(100);
 return <div className="space-y-5"><h1 className="text-3xl font-bold">Review contributions</h1>
 <p>Approve and record received items before they become available to beneficiaries.</p>
 {error&&<p className="text-red-600">{error.message}</p>}
 {(data??[]).map(c=><article key={c.id} className="space-y-2 rounded-xl border bg-white p-5">
 <h2 className="font-semibold">{c.item_name}</h2><p>{c.quantity} {c.unit} · {c.category} · {c.status}</p>
 <p className="text-sm text-slate-600">Pickup: {c.pickup_address}</p>
 <ContributionActions id={c.id} status={c.status}/>
 </article>)}
 {!error&&!data?.length&&<p>No contributions yet.</p>}</div>;
}
