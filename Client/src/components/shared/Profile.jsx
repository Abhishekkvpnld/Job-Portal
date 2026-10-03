import {
    BriefcaseBusiness,
    CheckCircle2,
    Edit3,
    FileText,
    Mail,
    MapPin,
    Phone,
    Sparkles,
    UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileBox from "./UpdateProfileBox";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";

const Profile = () => {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);

    const { user } = useSelector((store) => store.auth);
    const { allAppliedJobs = [] } = useSelector((store) => store.jobs);

    const skills = user?.profile?.skills || [];

    const initials =
        user?.fullname
            ?.split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    const profileItems = [
        {
            label: "Email",
            value: user?.email || "Not provided",
            icon: Mail,
        },
        {
            label: "Phone",
            value: user?.phone || "Not provided",
            icon: Phone,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Profile Hero */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                    {/* Background */}
                    <div className="absolute inset-x-0 top-0 h-36 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
                                backgroundSize: "32px 32px",
                            }}
                        />
                    </div>

                    <div className="relative px-5 pb-6 pt-20 sm:px-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                                {/* Avatar */}
                                <div className="rounded-full bg-white p-1.5 shadow-xl">
                                    <Avatar className="h-28 w-28 border-4 border-white">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt={user?.fullname}
                                        />

                                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-bold text-white">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="pb-1">
                                    <div className="mb-1 flex flex-wrap items-center gap-2">
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                            {user?.fullname || "Your Name"}
                                        </h1>

                                        <Badge className="border-0 bg-blue-50 text-blue-700 hover:bg-blue-50">
                                            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                                            Candidate
                                        </Badge>
                                    </div>

                                    <p className="max-w-xl text-sm leading-6 text-slate-500">
                                        {user?.profile?.bio ||
                                            "Add a professional bio to help employers understand your experience and career goals."}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={() => setOpen(true)}
                                className="w-full rounded-xl bg-slate-900 px-5 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
                            >
                                <Edit3 className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>

                        {/* Contact information */}
                        <div className="mt-7 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                            {profileItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.label}
                                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                                            <Icon className="h-4.5 w-4.5" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                {item.label}
                                            </p>

                                            <p className="truncate text-sm font-semibold text-slate-700">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.section>

                {/* Profile details */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
                    {/* Skills */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Sparkles className="h-4 w-4" />
                                    </div>

                                    <h2 className="font-bold text-slate-900">
                                        Skills & Expertise
                                    </h2>
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    Technologies and skills you've added to your profile.
                                </p>
                            </div>

                            <Badge variant="secondary" className="rounded-full">
                                {skills.length} skills
                            </Badge>
                        </div>

                        {skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={`${skill}-${index}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.15 + index * 0.03,
                                        }}
                                    >
                                        <Badge
                                            variant="outline"
                                            className="rounded-full border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            {skill}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                                <Sparkles className="mx-auto mb-2 h-6 w-6 text-slate-400" />

                                <p className="text-sm font-medium text-slate-600">
                                    No skills added yet
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Add your skills to improve your profile.
                                </p>
                            </div>
                        )}
                    </motion.section>

                    {/* Resume */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <FileText className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Resume
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Your latest uploaded resume
                                </p>
                            </div>
                        </div>

                        {user?.profile?.resume ? (
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <FileText className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {user?.profile?.resumeOriginalName ||
                                                "Resume.pdf"}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            PDF Document
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={user.profile.resume}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-200"
                                >
                                    View Resume
                                </a>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-7 text-center">
                                <FileText className="mx-auto mb-2 h-7 w-7 text-slate-400" />

                                <p className="text-sm font-semibold text-slate-600">
                                    No resume uploaded
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Upload your resume from Edit Profile.
                                </p>
                            </div>
                        )}
                    </motion.section>
                </div>

                {/* Applied Jobs */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <BriefcaseBusiness className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Applied Jobs
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Track the jobs you've applied for.
                                </p>
                            </div>
                        </div>

                        <Badge
                            variant="secondary"
                            className="w-fit rounded-full px-3 py-1"
                        >
                            {allAppliedJobs.length} Applications
                        </Badge>
                    </div>

                    <AppliedJobTable />
                </motion.section>
            </main>

            <UpdateProfileBox
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
};

export default Profile;