import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompanyTable from "./CompanyTable";

import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompany } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompany(input));

    return () => {
      dispatch(setSearchCompany(""));
    };
  }, [input, dispatch]);

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
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <Sparkles className="h-3.5 w-3.5" />
                Recruiter Dashboard
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Manage your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  companies
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage your registered companies and keep your employer
                profiles up to date.
              </p>
            </div>

            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="h-11 rounded-xl bg-slate-900 px-5 font-semibold shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-500/20"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl transition-all group-hover:bg-blue-200/70" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Company Management
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  Registered Companies
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-100/60 blur-2xl transition-all group-hover:bg-violet-200/70" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Hiring Management
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  Employer Profiles
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Companies section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Section header */}
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Your Companies
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search and manage your registered employer profiles.
                </p>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Search company..."
                  className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 pr-4 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          <CompanyTable />
        </motion.section>
      </main>
    </div>
  );
};

export default Companies;