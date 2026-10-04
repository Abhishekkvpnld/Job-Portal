import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";

import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";

import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { allApplicants } = useSelector(
    (store) => store.application
  );

  const [loading, setLoading] = useState(true);

  const applications = allApplicants?.applications || [];

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        if (res?.data?.success) {
          dispatch(setAllApplicants(res?.data?.data));
        }
      } catch (error) {
        console.error(error);

        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch applicants."
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchApplicants();
    }
  }, [params.id, dispatch]);

  const acceptedCount = applications.filter(
    (item) => item?.status === "Accepted"
  ).length;

  const rejectedCount = applications.filter(
    (item) => item?.status === "Rejected"
  ).length;

  const pendingCount = applications.filter(
    (item) =>
      !item?.status ||
      item?.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute top-[45%] -left-40 h-80 w-80 rounded-full bg-violet-200/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="mb-5 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-white hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </button>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <Sparkles className="h-3.5 w-3.5" />
                Candidate Management
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Job{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Applicants
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Review candidates, evaluate applications and manage your
                hiring pipeline.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <BriefcaseBusiness className="h-4 w-4 text-blue-600" />

              <span className="text-sm font-semibold text-slate-700">
                Candidate Pipeline
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          <StatCard
            label="Total Applicants"
            value={applications.length}
            icon={Users}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            label="Pending Review"
            value={pendingCount}
            icon={Clock3}
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            label="Accepted"
            value={acceptedCount}
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            label="Rejected"
            value={rejectedCount}
            icon={XCircle}
            iconClass="bg-red-50 text-red-600"
          />
        </motion.div>

        {/* Applicants */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Candidate Applications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review applications and update candidate status.
                </p>
              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 sm:flex">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : (
            <ApplicantsTable />
          )}
        </motion.section>
      </main>
    </div>
  );
};

/* ---------------- Stat Card ---------------- */

const StatCard = ({
  label,
  value,
  icon: Icon,
  iconClass,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            {label}
          </p>

          <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${iconClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

/* ---------------- Loading ---------------- */

const LoadingState = () => {
  return (
    <div className="space-y-3 p-5 sm:p-6">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-16 animate-pulse rounded-xl bg-slate-100"
        />
      ))}
    </div>
  );
};

export default Applicants;