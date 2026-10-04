import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

import {
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    FileText,
    IndianRupee,
    Layers3,
    Loader2,
    MapPin,
    Sparkles,
    Users,
} from "lucide-react";

import Navbar from "../shared/Navbar";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { JOB_API_END_POINT } from "@/utils/constants";

const PostJob = () => {
    const navigate = useNavigate();

    const { companies = [] } = useSelector(
        (store) => store.company
    );

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 1,
        companyId: "",
    });

    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeCompanyId = (value) => {
        setInput((prev) => ({
            ...prev,
            companyId: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.title.trim()) {
            toast.error("Please enter a job title.");
            return;
        }

        if (!input.description.trim()) {
            toast.error("Please enter a job description.");
            return;
        }

        if (!input.requirements.trim()) {
            toast.error("Please enter the job requirements.");
            return;
        }

        if (!input.location.trim()) {
            toast.error("Please enter a job location.");
            return;
        }

        if (!input.jobType) {
            toast.error("Please select a job type.");
            return;
        }

        if (!input.experience) {
            toast.error("Please select the experience level.");
            return;
        }

        if (!input.companyId) {
            toast.error("Please select a company.");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                {
                    ...input,
                    title: input.title.trim(),
                    description: input.description.trim(),
                    requirements: input.requirements.trim(),
                    location: input.location.trim(),
                    salary: input.salary,
                    position: Number(input.position),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                toast.success(
                    res?.data?.message || "Job posted successfully!"
                );

                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to post job. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="relative overflow-hidden">
                {/* Background */}
                <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

                <div className="pointer-events-none absolute -right-40 top-96 h-[500px] w-[500px] rounded-full bg-violet-200/30 blur-3xl" />

                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                        maskImage:
                            "linear-gradient(to bottom, black, transparent 75%)",
                    }}
                />

                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="mb-8"
                    >
                        <button
                            type="button"
                            onClick={() => navigate("/admin/jobs")}
                            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Jobs
                        </button>

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Recruiter workspace
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Create a new job
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                    Publish an attractive opportunity and connect
                                    with qualified candidates on DreamIT.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Posting status
                                    </p>

                                    <p className="text-sm font-semibold text-slate-700">
                                        Ready to publish
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Layout */}
                    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                        {/* Main form */}
                        <motion.form
                            onSubmit={handleSubmit}
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
                            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50"
                        >
                            {/* Gradient top */}
                            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                            <div className="p-5 sm:p-7 lg:p-8">
                                {/* Basic information */}
                                <FormSection
                                    icon={BriefcaseBusiness}
                                    title="Job Information"
                                    description="Provide the basic details candidates need."
                                >
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <FormField
                                            label="Job Title"
                                            required
                                            className="md:col-span-2"
                                        >
                                            <Input
                                                name="title"
                                                value={input.title}
                                                onChange={onChangeHandler}
                                                placeholder="e.g. Senior MERN Stack Developer"
                                                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </FormField>

                                        <FormField
                                            label="Description"
                                            required
                                            className="md:col-span-2"
                                        >
                                            <textarea
                                                name="description"
                                                value={input.description}
                                                onChange={onChangeHandler}
                                                rows={5}
                                                placeholder="Describe the role, responsibilities and what the candidate will work on..."
                                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </FormField>

                                        <FormField
                                            label="Requirements"
                                            required
                                            className="md:col-span-2"
                                        >
                                            <textarea
                                                name="requirements"
                                                value={input.requirements}
                                                onChange={onChangeHandler}
                                                rows={4}
                                                placeholder="e.g. React, Node.js, MongoDB, REST APIs, Git..."
                                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </FormField>
                                    </div>
                                </FormSection>

                                {/* Job details */}
                                <FormSection
                                    icon={Layers3}
                                    title="Job Details"
                                    description="Define the position and employment conditions."
                                >
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Location"
                                            required
                                            icon={MapPin}
                                        >
                                            <Input
                                                name="location"
                                                value={input.location}
                                                onChange={onChangeHandler}
                                                placeholder="e.g. Bangalore, India"
                                                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </FormField>

                                        <FormField
                                            label="Salary (LPA)"
                                            icon={IndianRupee}
                                        >
                                            <Input
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                name="salary"
                                                value={input.salary}
                                                onChange={onChangeHandler}
                                                placeholder="e.g. 6.5"
                                                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </FormField>

                                        <FormField
                                            label="Job Type"
                                            required
                                        >
                                            <Select
                                                value={input.jobType}
                                                onValueChange={(value) =>
                                                    setInput((prev) => ({
                                                        ...prev,
                                                        jobType: value,
                                                    }))
                                                }
                                            >
                                                <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50">
                                                    <SelectValue placeholder="Select job type" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Full Time">
                                                            Full Time
                                                        </SelectItem>

                                                        <SelectItem value="Part Time">
                                                            Part Time
                                                        </SelectItem>

                                                        <SelectItem value="Contract">
                                                            Contract
                                                        </SelectItem>

                                                        <SelectItem value="Internship">
                                                            Internship
                                                        </SelectItem>

                                                        <SelectItem value="Freelance">
                                                            Freelance
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormField>

                                        <FormField
                                            label="Experience"
                                            required
                                        >
                                            <Select
                                                value={input.experience}
                                                onValueChange={(value) =>
                                                    setInput((prev) => ({
                                                        ...prev,
                                                        experience: value,
                                                    }))
                                                }
                                            >
                                                <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50">
                                                    <SelectValue placeholder="Select experience" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="Fresher">
                                                            Fresher
                                                        </SelectItem>

                                                        <SelectItem value="0-1 Years">
                                                            0-1 Years
                                                        </SelectItem>

                                                        <SelectItem value="1-3 Years">
                                                            1-3 Years
                                                        </SelectItem>

                                                        <SelectItem value="3-5 Years">
                                                            3-5 Years
                                                        </SelectItem>

                                                        <SelectItem value="5+ Years">
                                                            5+ Years
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormField>

                                        <FormField
                                            label="Number of Positions"
                                            required
                                            icon={Users}
                                        >
                                            <Input
                                                type="number"
                                                min="1"
                                                name="position"
                                                value={input.position}
                                                onChange={onChangeHandler}
                                                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </FormField>
                                    </div>
                                </FormSection>

                                {/* Company */}
                                <FormSection
                                    icon={Building2}
                                    title="Company"
                                    description="Choose the company publishing this opportunity."
                                >
                                    {companies.length > 0 ? (
                                        <Select
                                            value={input.companyId}
                                            onValueChange={
                                                handleChangeCompanyId
                                            }
                                        >
                                            <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50">
                                                <SelectValue placeholder="Select a company" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    {companies.map(
                                                        (company) => (
                                                            <SelectItem
                                                                key={
                                                                    company._id
                                                                }
                                                                value={
                                                                    company._id
                                                                }
                                                            >
                                                                {company.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                                            <div className="flex gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500">
                                                    <Building2 className="h-5 w-5" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-red-700">
                                                        No company found
                                                    </p>

                                                    <p className="mt-1 text-xs leading-5 text-red-600/80">
                                                        You need to register a
                                                        company before posting
                                                        a job.
                                                    </p>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() =>
                                                            navigate(
                                                                "/admin/companies/create"
                                                            )
                                                        }
                                                        className="mt-3 h-9 rounded-lg border-red-200 bg-white text-xs text-red-600 hover:bg-red-50"
                                                    >
                                                        Create Company
                                                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </FormSection>

                                {/* Submit */}
                                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={loading}
                                        onClick={() =>
                                            navigate("/admin/jobs")
                                        }
                                        className="h-12 rounded-xl px-6 font-semibold text-slate-600"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={
                                            loading ||
                                            companies.length === 0
                                        }
                                        className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Publishing...
                                            </>
                                        ) : (
                                            <>
                                                Publish Job
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.form>

                        {/* Right sidebar */}
                        <motion.aside
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1,
                            }}
                            className="space-y-5"
                        >
                            {/* Preview */}
                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/50 p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <FileText className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-slate-800">
                                                Job Preview
                                            </h3>

                                            <p className="text-xs text-slate-500">
                                                How your job starts to look
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                        <BriefcaseBusiness className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-4 font-bold text-slate-800">
                                        {input.title ||
                                            "Your job title"}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {companies.find(
                                            (company) =>
                                                company._id ===
                                                input.companyId
                                        )?.name ||
                                            "Your company"}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {input.location && (
                                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                                                📍 {input.location}
                                            </span>
                                        )}

                                        {input.jobType && (
                                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700">
                                                {input.jobType}
                                            </span>
                                        )}

                                        {input.experience && (
                                            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs text-violet-700">
                                                {input.experience}
                                            </span>
                                        )}
                                    </div>

                                    {input.salary && (
                                        <div className="mt-4 border-t border-slate-100 pt-4">
                                            <p className="text-xs text-slate-400">
                                                Salary
                                            </p>

                                            <p className="font-bold text-slate-800">
                                                ₹{input.salary} LPA
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                                    <Sparkles className="h-5 w-5" />
                                </div>

                                <h3 className="mt-4 font-bold text-slate-800">
                                    Tips for a great job post
                                </h3>

                                <ul className="mt-3 space-y-3">
                                    {[
                                        "Use a clear and specific job title.",
                                        "Describe responsibilities in detail.",
                                        "Mention the most important skills.",
                                        "Keep salary and experience accurate.",
                                    ].map((tip) => (
                                        <li
                                            key={tip}
                                            className="flex gap-2 text-xs leading-5 text-slate-600"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </main>
        </div>
    );
};

/* ---------------------------------- */
/* Reusable Form Components */
/* ---------------------------------- */

const FormSection = ({
    icon: Icon,
    title,
    description,
    children,
}) => {
    return (
        <section className="border-b border-slate-100 py-7 first:pt-0 last:border-0">
            <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="font-bold text-slate-900">
                        {title}
                    </h2>

                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                        {description}
                    </p>
                </div>
            </div>

            {children}
        </section>
    );
};

const FormField = ({
    label,
    required = false,
    children,
}) => {
    return (
        <div>
            <Label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </Label>

            {children}
        </div>
    );
};

export default PostJob;