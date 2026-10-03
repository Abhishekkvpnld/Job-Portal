import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  WalletCards,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);

  // Correctly calculate how many days ago the job was posted
  const daysAgo = (time) => {
    if (!time) return null;

    const createdAt = new Date(time);
    const currentTime = new Date();

    const difference = currentTime - createdAt;

    return Math.max(
      0,
      Math.floor(difference / (1000 * 60 * 60 * 24))
    );
  };

  const postedDays = daysAgo(job?.createdAt);

  const getInitials = (name) => {
    if (!name) return "DR";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    navigate(`/description/${job?._id}`);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2 },
      }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/70"
      onClick={handleDetails}
    >
      {/* Top gradient line */}
      <div className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex h-full flex-col p-5">

        {/* =====================================================
            TOP ROW
        ===================================================== */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <CalendarDays className="h-3.5 w-3.5" />

            {postedDays === null
              ? "Recently posted"
              : postedDays === 0
                ? "Posted today"
                : postedDays === 1
                  ? "Posted 1 day ago"
                  : `Posted ${postedDays} days ago`}
          </div>

          {/* Bookmark */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleSave}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 ${
              isSaved
                ? "border-blue-100 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-white text-slate-400 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600"
            }`}
            aria-label={isSaved ? "Remove saved job" : "Save job"}
          >
            <Bookmark
              className={`h-4 w-4 transition-all ${
                isSaved ? "fill-current" : ""
              }`}
            />
          </motion.button>
        </div>

        {/* =====================================================
            COMPANY
        ===================================================== */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-1 shadow-sm">
            <Avatar className="h-11 w-11 rounded-xl">
              <AvatarImage
                src={job?.company?.logo}
                alt={job?.company?.name || "Company"}
                className="rounded-xl object-cover"
              />

              <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">
                {getInitials(job?.company?.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900">
              {job?.company?.name || "Company"}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span className="truncate">
                {job?.location || "India"}
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            JOB TITLE + DESCRIPTION
        ===================================================== */}
        <div className="mt-5">
          <h2 className="line-clamp-2 text-lg font-bold leading-6 text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
            {job?.title || "Job Opportunity"}
          </h2>

          <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
            {job?.description ||
              "Explore this opportunity and discover what the role has to offer."}
          </p>
        </div>

        {/* =====================================================
            JOB TAGS
        ===================================================== */}
        <div className="mt-5 flex flex-wrap gap-2">
          {/* Job type */}
          {job?.jobType && (
            <Badge
              variant="outline"
              className="rounded-lg border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600"
            >
              <BriefcaseBusiness className="mr-1 h-3 w-3" />
              {job.jobType}
            </Badge>
          )}

          {/* Work mode */}
          {job?.workMode && (
            <Badge
              variant="outline"
              className="rounded-lg border-violet-100 bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-600"
            >
              {job.workMode}
            </Badge>
          )}

          {/* Experience */}
          {job?.experience && (
            <Badge
              variant="outline"
              className="rounded-lg border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600"
            >
              <Clock3 className="mr-1 h-3 w-3" />
              {job.experience}
            </Badge>
          )}
        </div>

        {/* =====================================================
            SALARY / POSITION
        ===================================================== */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              <WalletCards className="h-3 w-3" />
              Salary
            </div>

            <p className="mt-1 text-sm font-bold text-slate-800">
              ₹{job?.salary || "—"} LPA
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              <BriefcaseBusiness className="h-3 w-3" />
              Positions
            </div>

            <p className="mt-1 text-sm font-bold text-slate-800">
              {job?.position || "—"}{" "}
              {job?.position === 1 ? "opening" : "openings"}
            </p>
          </div>
        </div>

        {/* =====================================================
            FOOTER ACTIONS
        ===================================================== */}
        <div className="mt-auto pt-5">
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleDetails}
                className="group/button flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-blue-600"
              >
                View Details

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                  isSaved
                    ? "border-blue-200 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-white text-slate-400 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                }`}
                aria-label="Save job"
              >
                {isSaved ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
};

export default Job;