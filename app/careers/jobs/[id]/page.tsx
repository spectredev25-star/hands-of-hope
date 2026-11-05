
"use client";

import Shell from "@/components/careers/Shell";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase, type Job } from "@/lib/careers-supabase";
import {
  ArrowLeft,
  MapPin,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [cv, setCv] = useState("");
  const [cover, setCover] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadJob() {
      try {
        const result = await supabase()
          .from("career_jobs")
          .select("*")
          .eq("id", id)
          .eq("status", "published")
          .maybeSingle();

        if (!active) return;

        setJob(result.error ? null : (result.data as Job | null));
      } catch {
        if (active) setJob(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadJob();

    return () => {
      active = false;
    };
  }, [id]);

  async function apply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const s = supabase();

      const {
        data: { user },
        error: authError,
      } = await s.auth.getUser();

      if (authError || !user) {
        setMessage(
          "Please sign in through Hands of Hope before applying."
        );
        return;
      }

      const { data: profile, error: profileError } = await s
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        setMessage("Could not verify your account role.");
        return;
      }

      if (profile?.role !== "beneficiary") {
        setMessage(
          "Applications are currently available to beneficiary accounts."
        );
        return;
      }

      const { error } = await s.from("career_applications").insert({
        job_id: id,
        applicant_id: user.id,
        cv_url: cv.trim(),
        cover_letter: cover.trim(),
      });

      setMessage(
        error
          ? `Could not submit: ${error.message}`
          : "Application submitted successfully. You can contact the employer through the platform when messaging is available."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <main className="detail-main container">
        <Link href="/careers" className="back">
          <ArrowLeft size={17} />
          All opportunities
        </Link>

        {loading ? (
          <div className="empty">Loading opportunity…</div>
        ) : !job ? (
          <div className="empty">
            <h2>Opportunity not found</h2>
            <p>
              This job may have been removed or is not yet published.
            </p>
          </div>
        ) : (
          <div className="detail-layout">
            <article className="detail-card">
              <span className="kicker">CAREER OPPORTUNITY</span>

              <h1>{job.title}</h1>
              <h3>{job.company_name}</h3>

              <div className="job-meta">
                <span>
                  <MapPin size={16} />
                  {job.location}
                </span>

                <span>
                  <BriefcaseBusiness size={16} />
                  {job.work_mode} · {job.employment_type}
                </span>
              </div>

              <hr />

              <h2>About this opportunity</h2>
              <p className="preserve">{job.description}</p>

              {job.requirements && (
                <>
                  <h2>What we're looking for</h2>
                  <p className="preserve">{job.requirements}</p>
                </>
              )}

              {job.salary_range && (
                <>
                  <h2>Compensation</h2>
                  <p>{job.salary_range}</p>
                </>
              )}
            </article>

            <aside className="apply-panel">
              <div className="kicker">TAKE THE NEXT STEP</div>

              <h2>Apply for this role</h2>

              <p>
                Sign in with your Hands of Hope beneficiary account
                to apply.
              </p>

              <form onSubmit={apply}>
                <label>
                  CV link (Google Drive, portfolio or PDF URL)
                  <input
                    required
                    type="url"
                    value={cv}
                    onChange={(e) => setCv(e.target.value)}
                    placeholder="https://..."
                  />
                </label>

                <label>
                  Short introduction
                  <textarea
                    required
                    minLength={20}
                    rows={6}
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    placeholder="Tell the employer why you're a good fit…"
                  />
                </label>

                <button
                  className="btn btn-primary full"
                  disabled={busy}
                >
                  {busy ? "Submitting…" : "Submit application"}
                </button>

                {message && (
                  <p role="status" className="form-message">
                    {message}
                  </p>
                )}
              </form>

              <p className="fine-print">
                <CheckCircle2 size={16} />
                Never pay an employer to secure an interview or job.
              </p>
            </aside>
          </div>
        )}
      </main>
    </Shell>
  );
}
