import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Clock3,
  Download,
  ExternalLink,
  FileText,
  Mail,
  MoreHorizontal,
  Phone,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Badge } from "../ui/badge";

import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";

const SHORTLIST_STATUS = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { allApplicants } = useSelector(
    (store) => store.application
  );

  const [updatingId, setUpdatingId] = useState(null);

  const applications = allApplicants?.applications || [];

  /* ---------------- Status Update ---------------- */

  const statusHandler = async (status, id) => {
    try {
      setUpdatingId(id);

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success(
          res?.data?.message ||
            `Candidate ${status.toLowerCase()} successfully.`
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* ---------------- Empty State ---------------- */

  if (applications.length === 0) {
    return <EmptyApplicants />;
  }

  return (
    <div>
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 bg-slate-50/70 hover:bg-slate-50/70">
              <TableHead className="h-12 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                Candidate
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Resume
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Applied
              </TableHead>

              <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                Status
              </TableHead>

              <TableHead className="h-12 pr-6 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.map((item, index) => (
              <motion.tr
                key={item?._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: Math.min(index * 0.04, 0.3),
                }}
                className="group border-slate-100 transition-colors hover:bg-slate-50/80"
              >
                {/* Candidate */}
                <TableCell className="pl-6">
                  <CandidateInfo item={item} />
                </TableCell>

                {/* Contact */}
                <TableCell>
                  <div className="space-y-1.5">
                    {item?.applicant?.email && (
                      <div className="flex max-w-[210px] items-center gap-2">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                        <span className="truncate text-sm text-slate-500">
                          {item.applicant.email}
                        </span>
                      </div>
                    )}

                    {item?.applicant?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />

                        <span className="text-xs text-slate-400">
                          {item.applicant.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Resume */}
                <TableCell>
                  <ResumeLink applicant={item?.applicant} />
                </TableCell>

                {/* Date */}
                <TableCell>
                  <span className="text-sm text-slate-500">
                    {formatDate(item?.createdAt)}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={item?.status} />
                </TableCell>

                {/* Action */}
                <TableCell className="pr-6 text-right">
                  <StatusMenu
                    item={item}
                    updatingId={updatingId}
                    statusHandler={statusHandler}
                  />
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
        {applications.map((item, index) => (
          <motion.div
            key={item?._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              delay: index * 0.04,
            }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <CandidateInfo item={item} />

              <StatusMenu
                item={item}
                updatingId={updatingId}
                statusHandler={statusHandler}
              />
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              {item?.applicant?.email && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">
                    {item.applicant.email}
                  </span>
                </div>
              )}

              {item?.applicant?.phone && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  {item.applicant.phone}
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                Applied {formatDate(item?.createdAt)}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <StatusBadge status={item?.status} />

              <ResumeLink applicant={item?.applicant} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
        <p className="text-xs font-medium text-slate-400">
          Showing{" "}
          <span className="font-bold text-slate-600">
            {applications.length}
          </span>{" "}
          {applications.length === 1
            ? "application"
            : "applications"}
        </p>
      </div>
    </div>
  );
};

/* ---------------- Candidate ---------------- */

const CandidateInfo = ({ item }) => {
  const name = item?.applicant?.fullname || "Unknown Candidate";

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 text-sm font-bold text-blue-600">
        {initials}
      </div>

      <div className="min-w-0">
        <p className="max-w-[170px] truncate font-semibold text-slate-900">
          {name}
        </p>

        <p className="mt-0.5 text-xs text-slate-400">
          Job Applicant
        </p>
      </div>
    </div>
  );
};

/* ---------------- Resume ---------------- */

const ResumeLink = ({ applicant }) => {
  const resume = applicant?.profile?.resume;
  const resumeName =
    applicant?.profile?.resumeOriginalName || "View Resume";

  if (!resume) {
    return (
      <span className="text-sm font-medium text-slate-400">
        No resume
      </span>
    );
  }

  return (
    <a
      href={resume}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-[170px] items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600 transition-all hover:border-emerald-200 hover:bg-emerald-100"
    >
      <FileText className="h-3.5 w-3.5 shrink-0" />

      <span className="truncate">
        {resumeName}
      </span>

      <ExternalLink className="h-3 w-3 shrink-0" />
    </a>
  );
};

/* ---------------- Status ---------------- */

const StatusBadge = ({ status }) => {
  const config = {
    Accepted: {
      label: "Accepted",
      icon: Check,
      className:
        "border-emerald-100 bg-emerald-50 text-emerald-600",
    },

    Rejected: {
      label: "Rejected",
      icon: UserX,
      className:
        "border-red-100 bg-red-50 text-red-600",
    },

    Pending: {
      label: "Pending",
      icon: Clock3,
      className:
        "border-amber-100 bg-amber-50 text-amber-600",
    },
  };

  const current = config[status] || config.Pending;
  const Icon = current.icon;

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${current.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {current.label}
    </Badge>
  );
};

/* ---------------- Status Menu ---------------- */

const StatusMenu = ({
  item,
  updatingId,
  statusHandler,
}) => {
  const isUpdating = updatingId === item?._id;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={isUpdating}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUpdating ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-48 rounded-xl border-slate-200 p-2 shadow-xl"
      >
        <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Update Status
        </p>

        <button
          type="button"
          onClick={() =>
            statusHandler("Accepted", item?._id)
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
            <UserCheck className="h-4 w-4 text-emerald-600" />
          </span>

          Accept Candidate
        </button>

        <button
          type="button"
          onClick={() =>
            statusHandler("Rejected", item?._id)
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
            <UserX className="h-4 w-4 text-red-600" />
          </span>

          Reject Candidate
        </button>
      </PopoverContent>
    </Popover>
  );
};

/* ---------------- Empty State ---------------- */

const EmptyApplicants = () => {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <Users className="h-7 w-7 text-slate-400" />
      </div>

      <h3 className="text-base font-bold text-slate-900">
        No applications yet
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
        Candidate applications for this job will appear here once people
        start applying.
      </p>
    </div>
  );
};

/* ---------------- Date ---------------- */

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

export default ApplicantsTable;