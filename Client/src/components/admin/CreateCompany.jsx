import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    Check,
    Lightbulb,
    Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { COMPANY_API_END_POINT } from "@/utils/constants";
import { setSingleCompany } from "@/redux/companySlice";

const CreateCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerCompany = async () => {
        const trimmedName = companyName.trim();

        if (!trimmedName) {
            toast.error("Please enter your company name.");
            return;
        }

        if (trimmedName.length < 2) {
            toast.error("Company name must contain at least 2 characters.");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                {
                    companyName: trimmedName,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.data));

                toast.success(
                    res?.data?.message || "Company created successfully!"
                );

                const companyId = res?.data?.data?._id;

                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerCompany();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Background */}
            <main className="relative min-h-[calc(100vh-64px)] overflow-hidden">
                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

                <div className="pointer-events-none absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-3xl" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/30 blur-3xl" />

                {/* Subtle grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                        maskImage:
                            "linear-gradient(to bottom, black, transparent 80%)",
                    }}
                />

                <div className="relative mx-auto flex max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:min-h-[calc(100vh-64px)] lg:py-16">
                    <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                        {/* Left information */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="hidden lg:block"
                        >
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                                <Sparkles className="h-4 w-4" />
                                Recruiter onboarding
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 xl:text-5xl">
                                Build your company presence on{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                    DreamIT.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-base leading-7 text-slate-500">
                                Create your company profile and start connecting
                                with talented candidates looking for their next
                                opportunity.
                            </p>

                            {/* Benefits */}
                            <div className="mt-8 space-y-4">
                                {[
                                    "Create and manage job opportunities",
                                    "Build a professional company profile",
                                    "Connect with qualified candidates",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                            <Check className="h-4 w-4" />
                                        </div>

                                        <span className="text-sm font-medium text-slate-600">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Main Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.55,
                                ease: "easeOut",
                            }}
                            className="relative"
                        >
                            {/* Glow */}
                            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-violet-500/20 blur-xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
                                {/* Top gradient */}
                                <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                                <div className="p-6 sm:p-8 lg:p-10">
                                    {/* Header */}
                                    <div className="mb-8">
                                        <div className="mb-5 flex items-center justify-between">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                                                <Building2 className="h-7 w-7" />
                                            </div>

                                            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                                                Step 1 of 2
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                            Create your company
                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            Let's start with the basics. Enter
                                            your company name to continue.
                                        </p>
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-8">
                                        <div className="mb-2 flex items-center justify-between text-xs">
                                            <span className="font-semibold text-blue-600">
                                                Company information
                                            </span>

                                            <span className="text-slate-400">
                                                50% complete
                                            </span>
                                        </div>

                                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "50%" }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: 0.3,
                                                }}
                                                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                                            />
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <Label
                                                htmlFor="companyName"
                                                className="mb-2 block text-sm font-semibold text-slate-700"
                                            >
                                                Company Name
                                            </Label>

                                            <div className="group relative">
                                                <Building2 className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600" />

                                                <Input
                                                    id="companyName"
                                                    type="text"
                                                    value={companyName}
                                                    onChange={(e) =>
                                                        setCompanyName(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. Google, Apple, Microsoft"
                                                    disabled={loading}
                                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                />
                                            </div>

                                            <p className="mt-2 text-xs text-slate-400">
                                                You can update your company
                                                details later.
                                            </p>
                                        </div>

                                        {/* Tip */}
                                        <div className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm">
                                                <Lightbulb className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-amber-800">
                                                    Pro tip
                                                </p>

                                                <p className="mt-0.5 text-xs leading-5 text-amber-700/80">
                                                    Use your official company
                                                    name. It helps candidates
                                                    recognize your organization.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                disabled={loading}
                                                onClick={() =>
                                                    navigate(
                                                        "/admin/companies"
                                                    )
                                                }
                                                className="h-12 flex-1 rounded-xl border-slate-200 font-semibold text-slate-600 transition-all hover:bg-slate-50"
                                            >
                                                <ArrowLeft className="mr-2 h-4 w-4" />
                                                Cancel
                                            </Button>

                                            <Button
                                                type="submit"
                                                disabled={
                                                    loading ||
                                                    !companyName.trim()
                                                }
                                                className="h-12 flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:pointer-events-none disabled:opacity-50"
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                        Creating...
                                                    </>
                                                ) : (
                                                    <>
                                                        Continue
                                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateCompany;