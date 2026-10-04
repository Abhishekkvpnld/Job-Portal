import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Globe,
  ImagePlus,
  Loader2,
  MapPin,
  Save,
  Upload,
} from "lucide-react";

import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import useGetCompanyDetails from "@/hooks/useGetCompanyDetails";

const CompanyDetails = () => {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useGetCompanyDetails(params.id);

  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    file: null,
  });

  /* ---------------- Input Handler ---------------- */

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- File Handler ---------------- */

  const fileHandler = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Logo must be smaller than 5MB.");
      return;
    }

    setInput((prev) => ({
      ...prev,
      file,
    }));

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  };

  /* ---------------- Submit ---------------- */

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.name.trim()) {
      toast.error("Company name is required.");
      return;
    }

    if (!input.location.trim()) {
      toast.error("Company location is required.");
      return;
    }

    const formData = new FormData();

    formData.append("name", input.name.trim());
    formData.append("description", input.description.trim());
    formData.append("location", input.location.trim());
    formData.append("website", input.website.trim());

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success(
          res?.data?.message || "Company updated successfully."
        );

        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update company. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Load Company ---------------- */

  useEffect(() => {
    if (!singleCompany) return;

    setInput({
      name: singleCompany?.name || "",
      location: singleCompany?.location || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      file: null,
    });

    setLogoPreview(singleCompany?.logo || "");
  }, [singleCompany]);

  /* ---------------- Cleanup Preview ---------------- */

  useEffect(() => {
    return () => {
      if (logoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute top-[50%] -left-40 h-80 w-80 rounded-full bg-violet-200/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={() => navigate("/admin/companies")}
            className="mb-5 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-white hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <Building2 className="h-3.5 w-3.5" />
                Company Management
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Company{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Setup
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Keep your company profile updated so candidates can learn more
                about your organization.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-600 sm:flex">
              <CheckCircle2 className="h-4 w-4" />
              Profile Settings
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Top gradient */}
          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

          <div className="grid lg:grid-cols-[280px_1fr]">
            {/* Left panel */}
            <div className="border-b border-slate-100 bg-slate-50/70 p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="sticky top-24">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Company Profile
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Build trust with candidates
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Keep your company information clear, professional and
                  up-to-date.
                </p>

                {/* Logo */}
                <div className="mt-8">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Company Logo
                  </p>

                  <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Company logo"
                        className="h-full w-full object-contain p-5"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <ImagePlus className="h-6 w-6" />
                        </div>

                        <p className="text-xs font-medium text-slate-500">
                          Upload company logo
                        </p>
                      </div>
                    )}

                    <label
                      htmlFor="company-logo"
                      className="absolute bottom-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-slate-900 text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-105"
                    >
                      <Upload className="h-4 w-4" />

                      <input
                        id="company-logo"
                        type="file"
                        accept="image/*"
                        onChange={fileHandler}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <p className="mt-2 text-center text-[11px] leading-5 text-slate-400">
                    PNG, JPG or WEBP · Max 5MB
                  </p>
                </div>

                {/* Tips */}
                <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                  <p className="text-xs font-bold text-blue-700">
                    💡 Pro Tip
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-600/80">
                    A recognizable logo and complete company profile can help
                    candidates trust your job postings.
                  </p>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-7">
                <h2 className="text-lg font-bold text-slate-900">
                  Company Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the details candidates will see on your company
                  profile.
                </p>
              </div>

              <div className="space-y-6">
                {/* Company Name */}
                <FormField
                  label="Company Name"
                  required
                  icon={Building2}
                >
                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    placeholder="e.g. Acme Technologies"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 pl-10 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </FormField>

                {/* Description */}
                <div>
                  <Label className="text-sm font-semibold text-slate-700">
                    Company Description
                  </Label>

                  <div className="mt-2">
                    <textarea
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      placeholder="Tell candidates about your company, culture and what you do..."
                      rows={5}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Website + Location */}
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    label="Company Website"
                    icon={Globe}
                  >
                    <Input
                      type="url"
                      name="website"
                      value={input.website}
                      onChange={changeEventHandler}
                      placeholder="https://example.com"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/50 pl-10 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </FormField>

                  <FormField
                    label="Location"
                    required
                    icon={MapPin}
                  >
                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="e.g. Bangalore, India"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/50 pl-10 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </FormField>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Ready to save?
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Your company profile will be updated immediately.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          navigate("/admin/companies")
                        }
                        disabled={loading}
                        className="h-11 rounded-xl border-slate-200 px-5 font-semibold"
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="h-11 rounded-xl bg-slate-900 px-6 font-semibold shadow-lg shadow-slate-900/10 transition-all hover:bg-blue-600"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.form>
      </main>
    </div>
  );
};

/* ---------------- Form Field ---------------- */

const FormField = ({
  label,
  required = false,
  icon: Icon,
  children,
}) => {
  return (
    <div>
      <Label className="text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </Label>

      <div className="relative mt-2">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}

        {children}
      </div>
    </div>
  );
};

export default CompanyDetails;