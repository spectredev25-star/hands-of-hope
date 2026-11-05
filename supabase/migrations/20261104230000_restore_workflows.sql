-- Hands of Hope: verified resource requests and admin workflows.
-- IMPORTANT: apply after the existing submission_backend migration.
-- Review table constraints against the deployed database before applying.

CREATE OR REPLACE FUNCTION public.submit_available_resource_request(p_resource_id uuid, p_description text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_user uuid := auth.uid(); v_resource public.resources%ROWTYPE; v_id uuid;
BEGIN
 IF v_user IS NULL OR NOT EXISTS (SELECT 1 FROM public.profiles WHERE id=v_user AND role='beneficiary') THEN RAISE EXCEPTION 'Beneficiary access required'; END IF;
 IF nullif(trim(p_description),'') IS NULL OR length(p_description)>2000 THEN RAISE EXCEPTION 'Please provide a valid reason'; END IF;
 SELECT * INTO v_resource FROM public.resources WHERE id=p_resource_id FOR UPDATE;
 IF NOT FOUND OR NOT v_resource.is_active OR v_resource.quantity_available <= 0 THEN RAISE EXCEPTION 'This resource is not currently available'; END IF;
 INSERT INTO public.assistance_requests (beneficiary_id, resource_id, title, category, description, status)
 VALUES(v_user,v_resource.id,v_resource.name,v_resource.category,trim(p_description),'pending_review') RETURNING id INTO v_id;
 RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.submit_available_resource_request(uuid,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_available_resource_request(uuid,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_review_contribution(p_contribution_id uuid, p_action text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE c public.contributions%ROWTYPE;
BEGIN
 IF auth.uid() IS NULL OR NOT EXISTS (SELECT 1 FROM public.profiles WHERE id=auth.uid() AND role='admin') THEN RAISE EXCEPTION 'Admin access required'; END IF;
 IF p_action NOT IN ('receive','reject') THEN RAISE EXCEPTION 'Invalid action'; END IF;
 SELECT * INTO c FROM public.contributions WHERE id=p_contribution_id FOR UPDATE;
 IF NOT FOUND OR c.status <> 'submitted' THEN RAISE EXCEPTION 'Contribution is no longer awaiting review'; END IF;
 IF p_action='reject' THEN
  UPDATE public.contributions SET status='rejected' WHERE id=c.id;
 ELSE
  -- Only the admin who has confirmed physical receipt may add inventory.
  INSERT INTO public.resources(name,description,category,quantity_available,unit,is_active)
  VALUES(c.item_name,c.description,c.category,c.quantity,c.unit,true);
  UPDATE public.contributions SET status='accepted',quantity_accepted=c.quantity,quantity_collected=c.quantity WHERE id=c.id;
 END IF;
END $$;
REVOKE ALL ON FUNCTION public.admin_review_contribution(uuid,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_review_contribution(uuid,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_review_assistance_request(p_request_id uuid,p_action text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE r public.assistance_requests%ROWTYPE; v_available integer;
BEGIN
 IF auth.uid() IS NULL OR NOT EXISTS (SELECT 1 FROM public.profiles WHERE id=auth.uid() AND role='admin') THEN RAISE EXCEPTION 'Admin access required'; END IF;
 IF p_action NOT IN ('approve','reject','complete') THEN RAISE EXCEPTION 'Invalid action'; END IF;
 SELECT * INTO r FROM public.assistance_requests WHERE id=p_request_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Request not found'; END IF;
 IF p_action IN ('approve','reject') THEN
  IF r.status <> 'pending_review' THEN RAISE EXCEPTION 'Request already reviewed'; END IF;
  IF p_action='approve' THEN
   SELECT quantity_available INTO v_available FROM public.resources WHERE id=r.resource_id AND is_active=true FOR UPDATE;
   IF coalesce(v_available,0)<1 THEN RAISE EXCEPTION 'Resource out of stock'; END IF;
   UPDATE public.assistance_requests SET status='approved' WHERE id=r.id;
  ELSE
   UPDATE public.assistance_requests SET status='rejected' WHERE id=r.id;
  END IF;
 ELSE
  IF r.status <> 'approved' THEN RAISE EXCEPTION 'Approve the request first'; END IF;
  UPDATE public.resources SET quantity_available=quantity_available-1 WHERE id=r.resource_id AND is_active=true AND quantity_available>0;
  IF NOT FOUND THEN RAISE EXCEPTION 'Resource out of stock'; END IF;
  UPDATE public.assistance_requests SET status='completed' WHERE id=r.id;
 END IF;
END $$;
REVOKE ALL ON FUNCTION public.admin_review_assistance_request(uuid,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_review_assistance_request(uuid,text) TO authenticated;
