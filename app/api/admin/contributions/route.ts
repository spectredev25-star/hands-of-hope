import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
export async function POST(request:Request) {
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();
 if(!user)return NextResponse.json({error:"Sign in required"},{status:401});
 const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(profile?.role!=="admin")return NextResponse.json({error:"Admin access required"},{status:403});
 let body:Record<string,unknown>;try{body=await request.json();}catch{return NextResponse.json({error:"Invalid request"},{status:400});}
 if(typeof body.id!=="string"||!(["receive","reject"] as unknown[]).includes(body.action))return NextResponse.json({error:"Invalid action"},{status:400});
 const {error}=await supabase.rpc("admin_review_contribution",{p_contribution_id:body.id,p_action:body.action});
 if(error)return NextResponse.json({error:error.message},{status:400});
 return NextResponse.json({ok:true});
}
