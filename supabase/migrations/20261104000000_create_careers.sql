-- Hands of Hope Careers: additive migration, does not change existing profile tables.
CREATE TABLE public.career_jobs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 organization_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
 title text NOT NULL CHECK(length(trim(title)) BETWEEN 3 AND 120),
 company_name text NOT NULL CHECK(length(trim(company_name)) BETWEEN 2 AND 120),
 location text NOT NULL,
 work_mode text NOT NULL CHECK(work_mode IN ('On-site','Remote','Hybrid')),
 employment_type text NOT NULL CHECK(employment_type IN ('Full-time','Part-time','Contract','Internship','Volunteer')),
 category text NOT NULL CHECK(category IN ('Technology','Administration','Education','Healthcare','Creative & Design','Construction','Business','Hospitality','Other')),
 description text NOT NULL CHECK(length(trim(description)) >= 30),
 requirements text,
 salary_range text,
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','published','rejected','closed')),
 reviewed_by uuid REFERENCES public.profiles(id),
 reviewed_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX career_jobs_public_idx ON public.career_jobs(status,created_at DESC);
CREATE INDEX career_jobs_owner_idx ON public.career_jobs(organization_id);
CREATE TABLE public.career_applications (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 job_id uuid NOT NULL REFERENCES public.career_jobs(id) ON DELETE CASCADE,
 applicant_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
 cv_url text NOT NULL CHECK(cv_url ~* '^https://'),
 cover_letter text NOT NULL CHECK(length(trim(cover_letter)) >= 20),
 status text NOT NULL DEFAULT 'submitted' CHECK(status IN ('submitted','reviewing','shortlisted','rejected','hired')),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(job_id,applicant_id)
);
CREATE INDEX career_applications_applicant_idx ON public.career_applications(applicant_id);
CREATE INDEX career_applications_job_idx ON public.career_applications(job_id);
ALTER TABLE public.career_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
GRANT SELECT,INSERT,UPDATE ON public.career_jobs TO authenticated;
GRANT SELECT ON public.career_jobs TO anon;
GRANT SELECT,INSERT ON public.career_applications TO authenticated;
-- Public jobs are visible, but pending submissions only to owner and admin.
CREATE POLICY "Published jobs or owner admin read" ON public.career_jobs FOR SELECT TO authenticated
USING (status='published' OR organization_id=(select auth.uid()) OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id=(select auth.uid()) AND p.role='admin'));
CREATE POLICY "Anonymous published jobs" ON public.career_jobs FOR SELECT TO anon USING(status='published');
CREATE POLICY "Organization submits pending jobs" ON public.career_jobs FOR INSERT TO authenticated
WITH CHECK (organization_id=(select auth.uid()) AND status='pending' AND reviewed_by IS NULL AND reviewed_at IS NULL AND EXISTS(SELECT 1 FROM public.profiles p WHERE p.id=(select auth.uid()) AND p.role IN ('organization','admin')));
-- Only admins can change review status; prevent owners approving their own listings.
CREATE POLICY "Admin reviews jobs" ON public.career_jobs FOR UPDATE TO authenticated
USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id=(select auth.uid()) AND p.role='admin'))
WITH CHECK (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id=(select auth.uid()) AND p.role='admin'));
CREATE POLICY "Applicants and employers read applications" ON public.career_applications FOR SELECT TO authenticated
USING (applicant_id=(select auth.uid()) OR EXISTS(SELECT 1 FROM public.career_jobs j WHERE j.id=job_id AND j.organization_id=(select auth.uid())) OR EXISTS(SELECT 1 FROM public.profiles p WHERE p.id=(select auth.uid()) AND p.role='admin'));
CREATE POLICY "Beneficiaries apply for published jobs" ON public.career_applications FOR INSERT TO authenticated
WITH CHECK (applicant_id=(select auth.uid()) AND status='submitted' AND EXISTS(SELECT 1 FROM public.profiles p WHERE p.id=(select auth.uid()) AND p.role='beneficiary') AND EXISTS(SELECT 1 FROM public.career_jobs j WHERE j.id=job_id AND j.status='published'));
-- Do not grant application UPDATE until secure workflow is implemented.
NOTIFY pgrst, 'reload schema';
