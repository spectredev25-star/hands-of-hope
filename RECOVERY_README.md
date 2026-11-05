# Hands of Hope — recovered frontend and workflow additions

This ZIP preserves the uploaded project and adds an admin review interface, resource detail/request form, protected APIs, and database functions for checking stock.

## Required before using the new workflows
1. Back up the current Supabase database and review `supabase/migrations/20261104230000_restore_workflows.sql` against the actual deployed schema. The uploaded ZIP did **not** contain `20261104133534_submission_backend.sql`, so its exact table constraints could not be verified. Do **not** apply the new migration blindly. In particular, verify contribution status `accepted`, resource insert columns, request `resource_id`, and whether distributions require additional records.
2. Once the migration is reconciled, deploy it using the original linked Supabase project folder, or Supabase SQL Editor. The new endpoints depend on these RPC functions.
3. Create or designate an admin profile securely in Supabase; signup should not allow arbitrary admin role selection.
4. Configure `.env.local` with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Optionally set NEXT_PUBLIC_SITE_URL=https://hands-of-hope.vercel.app for production email confirmation; leave unset for local confirmation.
5. Run `npm.cmd install`, then `npm.cmd run dev` from the project root. Deploy the updated project to Vercel separately.

## Limitations
- The admin screen provides an MVP review flow, not a complete warehouse/QR collection system.
- Completion currently decrements resource stock and updates request status; it does not create a row in `distributions`, so the existing distribution history page will not show that event until integrated.
- The ZIP was prepared without a live Supabase connection or a full Next.js dependency install/build. Test all three roles before submission.
- Google signup role data stored in sessionStorage does not transfer across domains. Its OAuth callback remains on the initiating origin to preserve the existing flow; test this separately.
