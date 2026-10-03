import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  WalletCards,
  Building2,
  Sparkles,
  Send,
} from "lucide-react";

import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../shared/Navbar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constants";

import { toast } from "sonner";
import { motion } from "framer-motion";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const jobId = params.id;

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  // =========================================================
  // FETCH JOB
  // =========================================================

  const fetchSingleJob = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${JOB_API_END_POINT}/get/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const job = res.data.data;

        dispatch(setSingleJob(job));

        const alreadyApplied =
          job?.applications?.some(
            (application) =>
              application.applicant === user?._id
          ) || false;

        setIsApplied(alreadyApplied);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load job"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // APPLY JOB
  // =========================================================

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login to apply for this job");
      navigate("/login");
      return;
    }

    if (isApplied || applying) return;

    try {
      setApplying(true);

      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            {
              applicant: user?._id,
            },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));

        toast.success(
          res?.data?.message ||
            "Application submitted successfully"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to apply for this job"
      );
    } finally {
      setApplying(false);
    }
  };

  // =========================================================
  // FETCH
  // =========================================================

  useEffect(() => {
    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, user?._id]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-2/3 rounded-lg bg-slate-200" />

            <div className="h-4 w-1/3 rounded bg-slate-200" />

            <div className="grid gap-5 lg:grid-cols-3">
              <div className="h-72 rounded-2xl bg-slate-200 lg:col-span-2" />
              <div className="h-72 rounded-2xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // JOB NOT FOUND
  // =========================================================

  if (!singleJob) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <BriefcaseBusiness className="h-7 w-7 text-blue-600" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              Job not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              This job may have been removed or is no longer
              available.
            </p>

            <Button
              onClick={() => navigate("/jobs")}
              className="mt-6 rounded-xl"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // DATE
  // =========================================================

  const postedDate = singleJob?.createdAt
    ? new Date(singleJob.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "Recently";

  // =========================================================
  // INFO CARDS
  // =========================================================

  const jobInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: singleJob?.location || "Not specified",
      color: "blue",
    },
    {
      icon: BriefcaseBusiness,
      label: "Job Type",
      value: singleJob?.jobType || "Not specified",
      color: "violet",
    },
    {
      icon: Clock3,
      label: "Experience",
      value: `${singleJob?.experience || 0} Years`,
      color: "orange",
    },
    {
      icon: WalletCards,
      label: "Salary",
      value: `${singleJob?.salary || "Not specified"} LPA`,
      color: "emerald",
    },
  ];

  const iconColors = {
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
    orange: "bg-orange-50 text-orange-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.08),transparent_30%)]" />

        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </motion.button>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            {/* Job title */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="max-w-3xl"
            >
              <div className="mb-5 flex items-center gap-3">
                {/* Company logo */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-500/20">
                  <Building2 className="h-7 w-7 text-white" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {singleJob?.company?.name ||
                      "Company"}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {singleJob?.location ||
                      "India"}
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {singleJob?.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                {singleJob?.description}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 font-medium text-blue-600 hover:bg-blue-50">
                  {singleJob?.position} Positions
                </Badge>

                <Badge className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 font-medium text-violet-600 hover:bg-violet-50">
                  {singleJob?.jobType}
                </Badge>

                <Badge className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 font-medium text-emerald-600 hover:bg-emerald-50">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </motion.div>

            {/* Desktop Apply */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className="lg:min-w-[220px]"
            >
              <Button
                onClick={
                  isApplied ? undefined : applyJobHandler
                }
                disabled={isApplied || applying}
                className={`group h-14 w-full rounded-2xl px-8 text-base font-bold shadow-xl transition-all lg:w-auto ${
                  isApplied
                    ? "bg-emerald-500 text-white hover:bg-emerald-500"
                    : "bg-slate-950 text-white shadow-slate-950/10 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-600/20"
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Already Applied
                  </>
                ) : applying ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    Apply Now
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-3">
          {/* =================================================
              LEFT
          ================================================== */}

          <div className="space-y-7 lg:col-span-2">
            {/* Job Overview */}
            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-7">
                <p className="text-sm font-semibold text-blue-600">
                  JOB OVERVIEW
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  About this opportunity
                </h2>
              </div>

              {/* Info grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {jobInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconColors[item.color]}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            {item.label}
                          </p>

                          <p className="mt-0.5 text-sm font-bold text-slate-800">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Description */}
            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-blue-600">
                    ROLE DETAILS
                  </p>

                  <h2 className="text-2xl font-bold text-slate-950">
                    Job Description
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-sm font-bold text-slate-900">
                    Role
                  </h3>

                  <p className="text-sm leading-7 text-slate-500">
                    {singleJob?.title}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold text-slate-900">
                    Description
                  </h3>

                  <p className="whitespace-pre-line text-sm leading-7 text-slate-500">
                    {singleJob?.description}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold text-slate-900">
                    Location
                  </h3>

                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    {singleJob?.location}
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <motion.aside
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Sidebar header */}
              <div className="relative overflow-hidden bg-slate-950 p-6 text-white">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-2 text-blue-300">
                    <Sparkles className="h-4 w-4" />

                    <span className="text-xs font-semibold">
                      JOB AT A GLANCE
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-bold">
                    Ready to apply?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Take the next step toward your career.
                  </p>
                </div>
              </div>

              {/* Sidebar details */}
              <div className="p-5">
                <div className="space-y-1">
                  {/* Applicants */}
                  <div className="flex items-center justify-between rounded-xl p-3 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>

                      <span className="text-sm text-slate-500">
                        Applicants
                      </span>
                    </div>

                    <span className="font-bold text-slate-900">
                      {singleJob?.applications?.length || 0}
                    </span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center justify-between rounded-xl p-3 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                        <BriefcaseBusiness className="h-4 w-4 text-violet-600" />
                      </div>

                      <span className="text-sm text-slate-500">
                        Experience
                      </span>
                    </div>

                    <span className="font-bold text-slate-900">
                      {singleJob?.experience || 0} yrs
                    </span>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center justify-between rounded-xl p-3 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                        <WalletCards className="h-4 w-4 text-emerald-600" />
                      </div>

                      <span className="text-sm text-slate-500">
                        Salary
                      </span>
                    </div>

                    <span className="font-bold text-slate-900">
                      {singleJob?.salary} LPA
                    </span>
                  </div>

                  {/* Posted */}
                  <div className="flex items-center justify-between rounded-xl p-3 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                        <CalendarDays className="h-4 w-4 text-orange-600" />
                      </div>

                      <span className="text-sm text-slate-500">
                        Posted
                      </span>
                    </div>

                    <span className="text-xs font-bold text-slate-900">
                      {postedDate}
                    </span>
                  </div>
                </div>

                {/* Apply button */}
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <Button
                    onClick={
                      isApplied
                        ? undefined
                        : applyJobHandler
                    }
                    disabled={isApplied || applying}
                    className={`h-12 w-full rounded-xl font-semibold ${
                      isApplied
                        ? "bg-emerald-500 hover:bg-emerald-500"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isApplied
                      ? "✓ Application Submitted"
                      : applying
                      ? "Submitting..."
                      : "Apply for this Job"}
                  </Button>

                  <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                    Make sure your profile is up to date
                    before applying.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default JobDescription;