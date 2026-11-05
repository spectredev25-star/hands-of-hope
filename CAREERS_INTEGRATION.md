# Hands of Hope — unified project

This package merges Dorcas’s original Next.js 16 app with the Hands of Hope Careers pages. The original home, authentication, beneficiary and organisation dashboards remain intact.

## Start locally
1. Open the `hands-of-hope-main` folder (the one containing `package.json`) in VS Code.
2. Use the same `.env.local` variables as Dorcas’s project (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`). Never upload secrets.
3. Run `npm.cmd install` and `npm.cmd run dev`.
4. Visit `http://localhost:3000/careers` and `http://localhost:3000/`.

## Database — do not run until reviewed
The new file `supabase/migrations/20261104000000_create_careers.sql` adds `career_jobs` and `career_applications`. It assumes `public.profiles` exists and `role` is one of `beneficiary`, `organization`, `admin`. Review migration history on the linked Supabase project before using `supabase.cmd db push --linked`. **Dorcas’s ZIP also includes older migrations that may not match the remote migration history; do not blindly push all migrations.**

## Current scope
- `/careers`: public job listings and search
- `/careers/jobs/[id]`: job details and application form
- `/careers/post`: organisation job submissions
- `/careers/manage`: job review and application visibility
- `/careers/mentorship` and `/careers/skills`: informational pages, not full registration/tracking systems

## Important checks
- This is a merged source-code package, **not** a deployed or verified production release.
- The Careers code now reuses Dorcas’s Supabase browser client, so authentication is shared.
- Verify all pages, RLS, roles, Google sign-in, email confirmation, and mobile views before release.
- CVs are currently submitted as HTTPS links; do not expose private CV links to unauthorized users.
- Check `npm audit` before deployment.
- Link to `/careers` from the main homepage/navigation once the product team chooses its exact placement.
