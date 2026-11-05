
"use client";

import Shell from "@/components/careers/Shell";
import { useEffect, useState } from "react";
import { supabase, type Job } from "@/lib/careers-supabase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type JobStatus =
  | "pending"
  | "published"
  | "rejected"
  | "closed";

type ManagedJob = Job & {
  status: JobStatus;
};

type Application = {
  id: string;
  job_id: string;
  applicant_id: string;
  cv_url: string;
  cover_letter: string;
  status: string;
  created_at: string;
};

export default function Manage() {
  const [jobs, setJobs] = useState<ManagedJob[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    try {
      const s = supabase();

      const {
        data: { user },
        error: authError,
      } = await s.auth.getUser();

      if (authError || !user) {
        setMsg("Please sign in with your Hands of Hope account.");
        return;
      }

      const { data: p, error: profileError } = await s
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        setMsg("Could not verify your account role.");
        return;
      }

      const currentRole = p?.role || "";
      setRole(currentRole);

      if (!["admin", "organization"].includes(currentRole)) {
        setMsg(
          "Only organizations and admins can manage job opportunities."
        );
        return;
      }

      const [
        { data: j, error: jobsError },
        { data: a, error: applicationsError },
      ] = await Promise.all([
        s
          .from("career_jobs")
          .select("*")
          .order("created_at", { ascending: false }),
        s
          .from("career_applications")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      setJobs((j || []) as ManagedJob[]);
      setApplications((a || []) as Application[]);

      if (jobsError || applicationsError) {
        setMsg(
          jobsError?.message ||
            applicationsError?.message ||
            "Could not load opportunities."
        );
      } else {
        setMsg("");
      }
    } catch (error) {
      setMsg(
        error instanceof Error
          ? error.message
          : "Unable to load opportunities."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function review(
    id: string,
    status: "published" | "rejected" | "closed"
  ) {
    try {
      const s = supabase();

      const {
        data: { user },
        error: authError,
      } = await s.auth.getUser();

      if (authError || !user) {
        setMsg("Please sign in to continue.");
        return;
      }

      const { data: profile, error: profileError } = await s
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError || profile?.role !== "admin") {
        setMsg("Only administrators can review job listings.");
        return;
      }

      const { error } = await s
        .from("career_jobs")
        .update({
          status,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        setMsg(error.message);
        return;
      }

      await load();
      setMsg(`Job marked ${status}.`);
    } catch (error) {
      setMsg(
        error instanceof Error
          ? error.message
          : "Unable to update the job."
      );
    }
  }

  return (
    <Shell>
      <main className="container detail-main">
        <Link className="back" href="/careers">
          <ArrowLeft size={16} />
          Careers
        </Link>

        <div className="kicker">
          HANDS OF HOPE / EMPLOYER DESK
        </div>

        <h1 style={{ fontSize: 44 }}>
          Manage opportunities
        </h1>

        <p style={{ color: "#6c7970" }}>
          Your submitted jobs and applications. Admins can
          review pending listings.
        </p>

        {msg && <div className="info-box">{msg}</div>}

        {loading ? (
          <p>Loading…</p>
        ) : jobs.length === 0 ? (
          <div className="empty">
            No opportunities submitted yet.
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((j) => {
              const jobApplications = applications.filter(
                (a) => a.job_id === j.id
              );

              return (
                <article className="job-card" key={j.id}>
                  <div className="kicker">
                    {j.status.toUpperCase()}
                  </div>

                  <h3>{j.title}</h3>

                  <p>
                    {j.company_name} · {j.location}
                  </p>

                  <p>
                    {jobApplications.length} applications
                  </p>

                  {role === "admin" && (
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          review(j.id, "published")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-outline"
                        onClick={() =>
                          review(j.id, "rejected")
                        }
                      >
                        Reject
                      </button>

                      <button
                        className="btn btn-outline"
                        onClick={() =>
                          review(j.id, "closed")
                        }
                      >
                        Close
                      </button>
                    </div>
                  )}

                  <details style={{ marginTop: 18 }}>
                    <summary>View applicants</summary>

                    {jobApplications.map((a) => (
                      <div
                        key={a.id}
                        style={{
                          borderTop: "1px solid #ddd",
                          padding: "14px 0",
                          overflowWrap: "anywhere",
                        }}
                      >
                        <strong>
                          Applicant {a.applicant_id.slice(0, 8)}
                        </strong>

                        <p>{a.cover_letter}</p>

                        <a
                          className="text-link"
                          href={a.cv_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open CV
                        </a>
                      </div>
                    ))}
                  </details>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </Shell>
  );
}
