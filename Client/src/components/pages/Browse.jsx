import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
    BriefcaseBusiness,
    Search,
    Sparkles,
    SlidersHorizontal,
} from "lucide-react";

import Job from "../shared/Job";
import Navbar from "../shared/Navbar";

import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
    useGetAllJobs();

    const dispatch = useDispatch();

    const { allJobs = [], searchQuery } = useSelector(
        (store) => store.jobs
    );

    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        };
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Background */}
            <div className="relative overflow-hidden">
                {/* Decorative gradients */}
                <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -right-40 top-72 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

                <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Hero */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 shadow-xl sm:p-8"
                    >
                        {/* Grid */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                                backgroundSize: "32px 32px",
                            }}
                        />

                        {/* Glow */}
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl" />
                        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

                        <div className="relative">
                            <div className="mb-3 flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-blue-300 backdrop-blur">
                                    <Sparkles className="h-4 w-4" />
                                </div>

                                <span className="text-sm font-medium text-blue-200">
                                    Discover your next opportunity
                                </span>
                            </div>

                            <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Find a job that{" "}
                                <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                                    fits your future.
                                </span>
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                                Explore the latest opportunities from growing
                                companies and find the role that matches your
                                skills, experience and career goals.
                            </p>

                            {/* Search summary */}
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                                    <Search className="h-5 w-5 text-blue-300" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">
                                            Current search
                                        </p>

                                        <p className="truncate text-sm font-semibold text-white">
                                            {searchQuery
                                                ? `"${searchQuery}"`
                                                : "All available jobs"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                                    <BriefcaseBusiness className="h-5 w-5 text-emerald-300" />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Opportunities
                                        </p>

                                        <p className="text-sm font-bold text-white">
                                            {allJobs.length} Jobs
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Results header */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                        className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                    Search Results
                                </h2>

                                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                                    {allJobs.length}
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                Browse through the latest opportunities
                                available on DreamIT.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm">
                                <SlidersHorizontal className="h-4 w-4" />
                                <span>All Jobs</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Jobs */}
                    {allJobs.length > 0 ? (
                        <motion.div
                            layout
                            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {allJobs.map((job, index) => (
                                <motion.div
                                    key={job?._id || index}
                                    layout
                                    initial={{
                                        opacity: 0,
                                        y: 25,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: Math.min(index * 0.04, 0.4),
                                    }}
                                    whileHover={{
                                        y: -4,
                                    }}
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        /* Empty state */
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.97,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm"
                        >
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <Search className="h-7 w-7" />
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-800">
                                No jobs found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                We couldn't find any opportunities matching
                                your current search. Try another keyword or
                                explore all available jobs.
                            </p>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Browse;