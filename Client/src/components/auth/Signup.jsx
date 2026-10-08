import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

import {
  Loader2,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  GraduationCap,
  UserPlus,
  ShieldCheck,
  Upload,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((store) => store.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState("");

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  // --------------------------------
  // Input change
  // --------------------------------
  const onChangeValueController = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // --------------------------------
  // Profile image
  // --------------------------------
  const fileHandler = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setInput({
      ...input,
      file,
    });

    setPreview(URL.createObjectURL(file));
  };

  // --------------------------------
  // Remove profile image
  // --------------------------------
  const removeImage = () => {
    setInput({
      ...input,
      file: "",
    });

    setPreview("");
  };

  // --------------------------------
  // Role selection
  // --------------------------------
  const handleRoleChange = (role) => {
    setInput((prev) => ({
      ...prev,
      role,
    }));
  };

  // --------------------------------
  // Submit
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!input.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!input.phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!input.password) {
      toast.error("Please enter your password");
      return;
    }

    if (input.password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }

    if (!input.role) {
      toast.error("Please select your role");
      return;
    }

    const formData = new FormData();

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    formData.append("password", input.password);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
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
          res?.data?.message || "Account created successfully"
        );

        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  // --------------------------------
  // Redirect logged-in users
  // --------------------------------
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

        <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-100/40 lg:grid lg:grid-cols-2">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}
          <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-12 text-white">

            {/* Decorative shapes */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

            <div className="absolute right-16 top-1/2 h-24 w-24 rounded-full bg-white/5" />

            <div className="relative z-10 flex w-full flex-col justify-between">

              {/* Header */}
              <div>

                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Start Your Journey</span>
                </div>

                <h2 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                  Your next opportunity
                  <br />
                  starts here.
                </h2>

                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                  Create your account and connect with companies,
                  recruiters, and opportunities that can help you
                  grow your career.
                </p>

              </div>

              {/* Features */}
              <div className="space-y-4">

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <UserPlus className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Create your profile
                    </p>

                    <p className="text-sm text-blue-100">
                      Showcase your skills and experience.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Discover opportunities
                    </p>

                    <p className="text-sm text-blue-100">
                      Find jobs that match your career goals.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Secure account
                    </p>

                    <p className="text-sm text-blue-100">
                      Your information stays protected.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md"
            >

              {/* Header */}
              <div className="mb-7">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <UserPlus className="h-6 w-6" />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Create your account
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Join the platform and start exploring opportunities.
                </p>

              </div>

              {/* =================================================
                  NAME
              ================================================= */}
              <div className="mb-4">

                <Label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </Label>

                <Input
                  id="fullName"
                  name="fullName"
                  value={input.fullName}
                  onChange={onChangeValueController}
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}
              <div className="mb-4">

                <Label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </Label>

                <Input
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={onChangeValueController}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* =================================================
                  PHONE
              ================================================= */}
              <div className="mb-4">

                <Label
                  htmlFor="phoneNumber"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone number
                </Label>

                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={onChangeValueController}
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* =================================================
                  PASSWORD
              ================================================= */}
              <div className="mb-5">

                <Label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </Label>

                <div className="relative">

                  <Input
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={onChangeValueController}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 pr-12 transition focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>

                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  Use at least 6 characters.
                </p>

              </div>

              {/* =================================================
                  ROLE
              ================================================= */}
              <div className="mb-5">

                <Label className="mb-3 block text-sm font-semibold text-slate-700">
                  I want to join as
                </Label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Student */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRoleChange("student")
                    }
                    className={`group flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                      input.role === "student"
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                        input.role === "student"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }`}
                    >
                      <GraduationCap className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Student
                      </p>

                      <p className="text-xs text-slate-500">
                        Find jobs
                      </p>
                    </div>

                  </button>

                  {/* Recruiter */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRoleChange("recruiter")
                    }
                    className={`group flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                      input.role === "recruiter"
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                        input.role === "recruiter"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }`}
                    >
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Recruiter
                      </p>

                      <p className="text-xs text-slate-500">
                        Post jobs
                      </p>
                    </div>

                  </button>

                </div>

              </div>

              {/* =================================================
                  PROFILE IMAGE
              ================================================= */}
              <div className="mb-6">

                <Label className="mb-3 block text-sm font-semibold text-slate-700">
                  Profile picture
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </Label>

                <div className="flex items-center gap-4">

                  {/* Preview */}
                  <div className="relative shrink-0">

                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Profile preview"
                          className="h-16 w-16 rounded-2xl border border-slate-200 object-cover shadow-sm"
                        />

                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-red-500 text-white shadow-sm transition hover:bg-red-600"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
                        <UserPlus className="h-6 w-6" />
                      </div>
                    )}

                  </div>

                  {/* Upload */}
                  <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-3 transition hover:border-blue-400 hover:bg-blue-50/50">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                      <Upload className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-medium text-slate-700">
                        {input.file
                          ? input.file.name
                          : "Upload profile picture"}
                      </p>

                      <p className="text-xs text-slate-400">
                        PNG, JPG up to 5MB
                      </p>

                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={fileHandler}
                      className="hidden"
                    />

                  </label>

                </div>

              </div>

              {/* =================================================
                  SIGNUP BUTTON
              ================================================= */}
              <Button
                type="submit"
                disabled={loading}
                className="group h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}

              </Button>

              {/* Login */}
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Sign in
                </Link>
              </p>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4" />
                Your information is securely protected
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Signup;
