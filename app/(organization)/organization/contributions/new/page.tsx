"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  LoaderCircle,
  PackagePlus,
} from "lucide-react";

const categories = [
  { value: "food", label: "Food and groceries" },
  { value: "clothing", label: "Clothing" },
  { value: "education", label: "Education and learning" },
  { value: "household", label: "Household essentials" },
  { value: "health", label: "Health and hygiene" },
  { value: "other", label: "Other" },
];

const fieldClass =
  "mt-2 w-full rounded-xl border border-[#DCE7E2] bg-white px-4 py-3 text-sm text-[#172524] outline-none transition placeholder:text-[#94A3A0] focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/10 dark:border-[#244540] dark:bg-[#071B1A] dark:text-[#F1F5F4] dark:placeholder:text-[#78918B]";

export default function NewContributionPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.preventDefault();
    const form = event.currentTarget;
    setError("");
    setSuccess("");
    setSubmitting(true);

    const formData = new FormData(form);
    const payload = {
      item_name: String(formData.get("item_name") ?? ""),
      category: String(formData.get("category") ?? ""),
      description: String(formData.get("description") ?? ""),
      quantity: Number(formData.get("quantity")),
      unit: String(formData.get("unit") ?? ""),
      pickup_address: String(formData.get("pickup_address") ?? ""),
    };

    try {
      const response = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Something went wrong.");
      }

      setSuccess("Your contribution has been submitted. Our team will review it shortly.");
      form.reset();

      window.setTimeout(() => {
        router.push("/organization/contributions");
        router.refresh();
      }, 1100);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit contribution.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-4xl"
    >
      <Link
        href="/organization/contributions"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#647572] transition hover:text-[#0F766E] dark:text-[#9AafAA] dark:hover:text-[#5EEAD4]"
      >
        <ArrowLeft size={16} /> Back to contributions
      </Link>

      <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E] dark:text-[#5EEAD4]">
            Make an impact
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Submit a contribution
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#647572] dark:text-[#9AafAA]">
            Tell us what your organization would like to contribute. Our team will review the details and coordinate collection with you.
          </p>
        </div>
        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#14B8A6]/20 bg-[#14B8A6]/10 text-[#0F766E] dark:text-[#5EEAD4] sm:flex">
          <PackagePlus size={25} />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#DCE7E2] bg-white p-5 shadow-[0_18px_60px_rgba(15,118,110,0.06)] dark:border-[#244540] dark:bg-[#0D2927] sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold sm:col-span-2">
              Item or resource name *
              <input name="item_name" required minLength={2} maxLength={120} placeholder="e.g. Rice and staple food packs" className={fieldClass} />
            </label>

            <label className="text-sm font-semibold">
              Category *
              <select name="category" required defaultValue="" className={fieldClass}>
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-[1fr_1fr] gap-3">
              <label className="text-sm font-semibold">
                Quantity *
                <input name="quantity" type="number" min="1" max="1000000" step="1" required placeholder="e.g. 50" className={fieldClass} />
              </label>
              <label className="text-sm font-semibold">
                Unit *
                <input name="unit" required maxLength={40} placeholder="packs, pieces..." className={fieldClass} />
              </label>
            </div>

            <label className="text-sm font-semibold sm:col-span-2">
              Description
              <textarea name="description" rows={4} maxLength={2000} placeholder="Describe the condition, packaging, expiry date (if applicable), or any useful details..." className={fieldClass + " resize-y"} />
            </label>

            <label className="text-sm font-semibold sm:col-span-2">
              Pickup address *
              <textarea name="pickup_address" required rows={3} maxLength={500} placeholder="Enter the full address where the contribution can be collected." className={fieldClass + " resize-y"} />
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-300">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="mt-5 flex items-start gap-2 rounded-xl border border-[#14B8A6]/25 bg-[#14B8A6]/8 px-4 py-3 text-sm text-[#0F766E] dark:text-[#99F6E4]">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> {success}
            </p>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#DCE7E2] pt-6 dark:border-[#244540] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#647572] dark:text-[#9AafAA]">* Required fields</p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0F766E]/15 transition hover:-translate-y-0.5 hover:bg-[#0D625B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? <LoaderCircle size={17} className="animate-spin" /> : <ArrowRight size={17} />}
              {submitting ? "Submitting..." : "Submit contribution"}
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-3xl border border-[#DCE7E2] bg-[#E8F5F1]/70 p-6 dark:border-[#244540] dark:bg-[#0D2927]">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E] dark:text-[#5EEAD4]">
            <HeartHandshake size={22} />
          </div>
          <h2 className="mt-5 text-base font-semibold">What happens next?</h2>
          <ol className="mt-5 space-y-5">
            {[
              ["01", "Review", "Our team checks your submission."],
              ["02", "Collection", "We contact you to arrange pickup."],
              ["03", "Inspection", "Items are checked before acceptance."],
              ["04", "Impact", "Accepted items enter available inventory."],
            ].map(([number, title, description]) => (
              <li key={number} className="flex gap-3">
                <span className="text-xs font-bold text-[#0F766E] dark:text-[#5EEAD4]">{number}</span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#647572] dark:text-[#9AafAA]">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </motion.div>
  );
}
