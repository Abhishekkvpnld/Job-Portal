import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  Edit3,
  Eye,
  MapPin,
  MoreHorizontal,
  SearchX,
  Users,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { Badge } from "../ui/badge";

const AdminJobsTable = () => {
  const navigate = useNavigate();

  const { allAdminJobs, searchJob } = useSelector((store) => store.jobs);

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const jobs = Array.isArray(allAdminJobs) ? allAdminJobs : [];

    const query = searchJob?.trim().toLowerCase();

    if (!query) {
      setFilterJobs(jobs);
      return;
    }

    const filtered = jobs.filter((job) => {
      const title = job?.title?.toLowerCase() || "";
      const company = job?.company?.name?.toLowerCase() || "";
      const location = job?.location?.toLowerCase() || "";

      return (
        title.includes(query) ||
        company.includes(query) ||
        location.includes(query)
      );
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJob]);

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name = "") => {
    return (
      name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase() || "C"
    );
  };

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 bg-slate-50/70 hover:bg-slate-50/70">
              <TableHead className="h-12 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                Company
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Position
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Location
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Posted
              </TableHead>

              <TableHead className="h-12 pr-6 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-80">
                  <EmptyState searchJob={searchJob} />
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((job, index) => (
                <motion.tr
                  key={job?._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(index * 0.035, 0.3),
                  }}
                  className="group border-slate-100 transition-colors hover:bg-slate-50/80"
                >
                  {/* Company */}
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-violet-50 text-sm font-bold text-blue-600">
                        {job?.company?.logo ? (
                          <img
                            src={job.company.logo}
                            alt={job?.company?.name || "Company"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          getInitials(job?.company?.name)
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[180px] truncate font-semibold text-slate-900">
                          {job?.company?.name || "Unknown Company"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Employer
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Position */}
                  <TableCell>
                    <div className="max-w-[220px]">
                      <p className="truncate font-semibold text-slate-800">
                        {job?.title || "Untitled Job"}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        {job?.jobType && (
                          <Badge
                            variant="secondary"
                            className="border-0 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600"
                          >
                            {job.jobType}
                          </Badge>
                        )}

                        {job?.workMode && (
                          <span className="hidden text-xs text-slate-400 lg:inline">
                            {job.workMode}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Location */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                      <span>{job?.location || "Remote"}</span>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      {formatDate(job?.createdAt)}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-6 text-right">
                    <JobActions job={job} navigate={navigate} />
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 p-4 md:hidden">
        {filterJobs.length === 0 ? (
          <div className="py-16">
            <EmptyState searchJob={searchJob} />
          </div>
        ) : (
          filterJobs.map((job, index) => (
            <motion.div
              key={job?._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 text-sm font-bold text-blue-600">
                    {job?.company?.logo ? (
                      <img
                        src={job.company.logo}
                        alt={job?.company?.name || "Company"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(job?.company?.name)
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-900">
                      {job?.title || "Untitled Job"}
                    </p>

                    <p className="truncate text-sm text-slate-500">
                      {job?.company?.name || "Unknown Company"}
                    </p>
                  </div>
                </div>

                <JobActions job={job} navigate={navigate} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <InfoItem
                  icon={MapPin}
                  text={job?.location || "Remote"}
                />

                <InfoItem
                  icon={CalendarDays}
                  text={formatDate(job?.createdAt)}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {job?.jobType && (
                  <Badge className="border-0 bg-blue-50 text-blue-600 hover:bg-blue-50">
                    {job.jobType}
                  </Badge>
                )}

                {job?.workMode && (
                  <Badge className="border-0 bg-violet-50 text-violet-600 hover:bg-violet-50">
                    {job.workMode}
                  </Badge>
                )}

                {job?.experience && (
                  <Badge className="border-0 bg-slate-100 text-slate-600 hover:bg-slate-100">
                    {job.experience}
                  </Badge>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      {filterJobs.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
          <p className="text-xs font-medium text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-600">
              {filterJobs.length}
            </span>{" "}
            {filterJobs.length === 1 ? "job" : "jobs"}
            {searchJob && (
              <>
                {" "}
                matching{" "}
                <span className="font-semibold text-slate-600">
                  "{searchJob}"
                </span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

const JobActions = ({ job, navigate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-48 rounded-xl border-slate-200 p-2 shadow-xl"
      >
        <button
          type="button"
          onClick={() => navigate(`/admin/jobs/${job?._id}/edit`)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
        >
          <Edit3 className="h-4 w-4" />
          Edit Job
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(`/admin/jobs/${job?._id}/applicants`)
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50 hover:text-violet-600"
        >
          <Users className="h-4 w-4" />
          View Applicants
        </button>

        <button
          type="button"
          onClick={() => navigate(`/jobs/${job?._id}`)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <Eye className="h-4 w-4" />
          Preview Job
        </button>
      </PopoverContent>
    </Popover>
  );
};

const InfoItem = ({ icon: Icon, text }) => {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      <span className="truncate">{text}</span>
    </div>
  );
};

const EmptyState = ({ searchJob }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        {searchJob ? (
          <SearchX className="h-7 w-7 text-slate-400" />
        ) : (
          <BriefcaseBusiness className="h-7 w-7 text-slate-400" />
        )}
      </div>

      <h3 className="text-base font-bold text-slate-900">
        {searchJob ? "No jobs found" : "No job postings yet"}
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
        {searchJob
          ? `We couldn't find any jobs matching "${searchJob}". Try another search.`
          : "Your published job opportunities will appear here once you create your first posting."}
      </p>
    </div>
  );
};

export default AdminJobsTable;