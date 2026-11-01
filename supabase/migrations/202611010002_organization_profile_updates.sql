-- Allow organization accounts to edit their own public-facing organization details.
-- Verification state and ownership remain controlled by Hands of Hope staff.

drop policy if exists "Organizations update own organization details" on public.organizations;

create policy "Organizations update own organization details"
on public.organizations
for update
to authenticated
using (
  profile_id = (select auth.uid())
  and public.current_app_role() = 'organization'
)
with check (
  profile_id = (select auth.uid())
  and public.current_app_role() = 'organization'
);

create or replace function public.protect_organization_review_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.current_app_role() = 'organization' then
    new.profile_id := old.profile_id;
    new.verification_status := old.verification_status;
    new.reviewed_by := old.reviewed_by;
    new.reviewed_at := old.reviewed_at;
  end if;

  return new;
end;
$$;

drop trigger if exists protect_organization_review_fields on public.organizations;

create trigger protect_organization_review_fields
before update on public.organizations
for each row
execute function public.protect_organization_review_fields();
