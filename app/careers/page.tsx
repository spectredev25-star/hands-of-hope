
"use client";

import Shell from "@/components/careers/Shell";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase, type Job } from "@/lib/careers-supabase";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Search,
  SlidersHorizontal,
  HeartHandshake,
  GraduationCap,
  Users,
  Clock,
  Building2,
} from "lucide-react";

const categories = [
  "All categories",
  "Technology",
  "Administration",
  "Education",
  "Healthcare",
  "Creative & Design",
  "Construction",
  "Business",
  "Hospitality",
  "Other",
];

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [mode, setMode] = useState("All work types");

  useEffect(() => {
    let active = true;

    async function loadJobs() {
      try {
        const result = await supabase()
          .from("career_jobs")
          .select("*")
          .eq("status", "published")
          .order("created_at", { ascending: false });

        if (!active) return;

        if (result.error) {
          setError(
            "Job listings are temporarily unavailable. Please try again later."
          );
        } else {
          setJobs((result.data || []) as Job[]);
        }
      } catch {
        if (active) {
          setError("The careers database is not configured yet.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadJobs();

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      jobs.filter(
        (j) =>
          [
            j.title,
            j.company_name,
            j.location,
            j.description,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (category === "All categories" ||
            j.category === category) &&
          (mode === "All work types" ||
            j.work_mode === mode)
      ),
    [jobs, query, category, mode]
  );

  return (
    <Shell>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">
                <span className="pulse" />
                HANDS OF HOPE / CAREER INITIATIVE
              </div>

              <h1>
                Opportunity changes <em>everything.</em>
              </h1>

              <p className="hero-copy">
                A job can open a door. A skill can change a
                future. Find meaningful work, discover your
                potential, and connect with people ready to
                help you grow.
              </p>

              <div className="hero-actions">
                <a
                  href="#opportunities"
                  className="btn btn-primary"
                >
                  Explore opportunities
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/careers/post"
                  className="btn btn-outline"
                >
                  I'm hiring
                  <ArrowUpRight size={17} />
                </Link>
              </div>

              <div className="hero-note">
                <span className="note-line" />
                One mission. More ways to make a difference.
              </div>
            </div>

            <div className="hero-art">
              <div className="orbit orbit1" />
              <div className="orbit orbit2" />

              <div className="art-center">
                <HeartHandshake
                  size={56}
                  strokeWidth={1.4}
                />
                <span>HOPE IN ACTION</span>
              </div>

              <div className="floating-card top-card">
                <span className="float-icon green">
                  <BriefcaseBusiness size={20} />
                </span>

                <div>
                  <strong>Meaningful work</strong>
                  <small>Find your next opportunity</small>
                </div>
              </div>

              <div className="floating-card bottom-card">
                <span className="float-icon gold">
                  <GraduationCap size={20} />
                </span>

                <div>
                  <strong>Grow your skills</strong>
                  <small>Build a brighter future</small>
                </div>
              </div>

              <div className="hero-corner">
                01 / 03
                <span>CAREERS • SKILLS • COMMUNITY</span>
              </div>
            </div>
          </div>
        </section>

        <section className="promise">
          <div className="container promise-inner">
            <span>OUR PURPOSE</span>

            <p>
              Because support is more than meeting today's
              needs.{" "}
              <strong>
                It's creating possibilities for tomorrow.
              </strong>
            </p>
          </div>
        </section>

        <section
          className="opportunities section"
          id="opportunities"
        >
          <div className="container">
            <div className="section-top">
              <div>
                <div className="kicker">
                  DISCOVER WHAT'S POSSIBLE
                </div>

                <h2>
                  Find your next <em>opportunity.</em>
                </h2>

                <p>
                  Explore opportunities shared by
                  organisations and employers in our growing
                  community.
                </p>
              </div>

              <div className="section-count">
                <BriefcaseBusiness size={18} />
                {loading
                  ? "Loading"
                  : `${filtered.length} opportunities`}
              </div>
            </div>

            <div className="searchbar">
              <label className="searchinput">
                <Search size={21} />

                <input
                  aria-label="Search jobs"
                  placeholder="Job title, keyword or organisation"
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                />
              </label>

              <label className="selectwrap">
                <SlidersHorizontal size={18} />

                <select
                  aria-label="Category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label className="selectwrap">
                <select
                  aria-label="Work type"
                  value={mode}
                  onChange={(e) =>
                    setMode(e.target.value)
                  }
                >
                  {[
                    "All work types",
                    "On-site",
                    "Remote",
                    "Hybrid",
                  ].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
            </div>

            {loading ? (
              <div className="empty">
                Loading opportunities…
              </div>
            ) : error ? (
              <div className="empty">
                <strong>
                  We're getting things ready.
                </strong>
                <p>{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">
                  <Search />
                </div>

                <h3>
                  {jobs.length === 0
                    ? "New opportunities are on their way."
                    : "No matching opportunities yet."}
                </h3>

                <p>
                  {jobs.length === 0
                    ? "We are building a trusted network of employers and opportunities. Check back soon."
                    : "Try a different search or filter to explore more listings."}
                </p>

                <Link
                  href="/careers/post"
                  className="text-link"
                >
                  Are you an employer? Post an opportunity
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="jobs-grid">
                {filtered.map((j) => (
                  <Link
                    className="job-card"
                    href={`/careers/jobs/${j.id}`}
                    key={j.id}
                  >
                    <div className="job-top">
                      <div className="company-icon">
                        <Building2 size={24} />
                      </div>

                      <span className="job-tag">
                        {j.employment_type}
                      </span>
                    </div>

                    <h3>{j.title}</h3>

                    <div className="company-name">
                      {j.company_name}
                    </div>

                    <div className="job-meta">
                      <span>
                        <MapPin size={15} />
                        {j.location}
                      </span>

                      <span>
                        <BriefcaseBusiness size={15} />
                        {j.work_mode}
                      </span>
                    </div>

                    <div className="job-bottom">
                      <span>
                        <Clock size={15} />
                        {new Date(
                          j.created_at
                        ).toLocaleDateString()}
                      </span>

                      <span className="job-arrow">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="pathways section">
          <div className="container">
            <div className="kicker">
              BEYOND THE JOB SEARCH
            </div>

            <h2>
              More than jobs. <em>A way forward.</em>
            </h2>

            <div className="path-grid">
              <Link
                href="/careers/mentorship"
                className="path-card"
              >
                <span className="path-number">
                  01 / CONNECT
                </span>

                <div className="path-icon">
                  <Users size={30} />
                </div>

                <h3>
                  Learn from someone who's been there.
                </h3>

                <p>
                  Discover mentorship opportunities and
                  connect with experienced professionals
                  who want to give back.
                </p>

                <span className="path-action">
                  Explore mentorship
                  <ArrowUpRight size={18} />
                </span>
              </Link>

              <Link
                href="/careers/skills"
                className="path-card"
              >
                <span className="path-number">
                  02 / GROW
                </span>

                <div className="path-icon">
                  <GraduationCap size={30} />
                </div>

                <h3>
                  Build skills that open doors.
                </h3>

                <p>
                  Explore training and skill-building
                  opportunities that can help you take
                  the next step.
                </p>

                <span className="path-action">
                  Explore skills
                  <ArrowUpRight size={18} />
                </span>
              </Link>

              <Link
                href="/careers/post"
                className="path-card"
              >
                <span className="path-number">
                  03 / GIVE BACK
                </span>

                <div className="path-icon">
                  <HeartHandshake size={30} />
                </div>

                <h3>
                  Be the reason someone gets a chance.
                </h3>

                <p>
                  Share a legitimate job opportunity
                  with the Hands of Hope community.
                </p>

                <span className="path-action">
                  Post an opportunity
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container cta-inner">
            <div>
              <div className="kicker">
                TOGETHER, WE CREATE CHANGE
              </div>

              <h2>
                Someone's next chapter
                <br />
                could start <em>with you.</em>
              </h2>

              <p>
                Employers, professionals, mentors and
                community partners all have a part to play.
              </p>
            </div>

            <Link
              href="/careers/post"
              className="btn btn-light"
            >
              Share an opportunity
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
