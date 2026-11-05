import { createClient } from "@/libs/supabase/client";
export const supabase = createClient;
export type Job = {id:string;title:string;company_name:string;location:string;work_mode:string;employment_type:string;category:string;description:string;requirements:string|null;salary_range:string|null;created_at:string;organization_id:string};
