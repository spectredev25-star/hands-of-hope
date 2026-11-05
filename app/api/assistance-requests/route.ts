import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
export async function POST(request:Request) {
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return NextResponse.json({error:"Please sign in."},{status:401});
  const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profile?.role!=="beneficiary") return NextResponse.json({error:"Beneficiary access required."},{status:403});
  let body:unknown;
  try {body=await request.json();} catch {return NextResponse.json({error:"Invalid request."},{status:400});}
  if(!body||typeof body!=="object") return NextResponse.json({error:"Invalid request."},{status:400});
  const input=body as Record<string,unknown>;
  const resourceId=typeof input.resource_id==="string"?input.resource_id:"";
  const description=typeof input.description==="string"?input.description.trim():"";
  if(!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(resourceId)||!description||description.length>2000)
    return NextResponse.json({error:"Choose a valid resource and provide a reason (up to 2000 characters)."},{status:400});
  // The database function locks and rechecks inventory to prevent requests for unavailable stock.
  const {data,error}=await supabase.rpc("submit_available_resource_request",{p_resource_id:resourceId,p_description:description});
  if(error) {console.error("Request submission:",error);return NextResponse.json({error:error.message},{status:400});}
  return NextResponse.json({request_id:data},{status:201});
}
