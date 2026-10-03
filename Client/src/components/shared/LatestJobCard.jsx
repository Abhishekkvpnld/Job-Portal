import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  MapPin,
  Users,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleCardClick = () => {
    navigate(`/description/${job?._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -7 }}
      onClick={handleCardClick}
      className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50"
    >
      {/* Gradient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top section */}
      <div className="relative flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          {/* Company logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-2 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-50">
            {job?.company?.logo ? (
              <img
                src={job.company.logo}
                alt={job?.company?.name || "Company"}
                className="h-full w-full rounded-xl object-contain"
              />
            ) : (
              <BriefcaseBusiness
                size={21}
                className="text-slate-500"
              />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-slate-900">
              {job?.company?.name || "Company"}
            </h2>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <MapPin size={13} />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Bookmark */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved(!saved);
          }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
            saved
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-100 bg-slate-50 text-slate-400 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <Bookmark
            size={17}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Job content */}
      <div className="relative mt-6">

        <h1 className="line-clamp-1 text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          {job?.title || "Job Title"}
        </h1>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
          {job?.description ||
            "Explore this exciting opportunity and take the next step in your career."}
        </p>
      </div>

      {/* Job information */}
      <div className="relative mt-5 flex flex-wrap gap-2">

        <Badge
          variant="secondary"
          className="rounded-full border-0 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
        >
          <Users size={13} className="mr-1" />
          {job?.position || 0} Positions
        </Badge>

        <Badge
          variant="secondary"
          className="rounded-full border-0 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700"
        >
          <BriefcaseBusiness size={13} className="mr-1" />
          {job?.jobType || "Full Time"}
        </Badge>

        <Badge
          variant="secondary"
          className="rounded-full border-0 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
        >
          ₹{job?.salary || "—"} LPA
        </Badge>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-slate-100" />

      {/* Bottom */}
      <div className="relative flex items-center justify-between">

        <span className="text-xs font-medium text-slate-400">
          Recently posted
        </span>

        <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:gap-2">
          View details
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LatestJobCard;