
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useEffect, useState } from "react";
import axios from "axios";

import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";

import {
  Eye,
  EyeOff,
  Loader2,
  BriefcaseBusiness,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((store) => store.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState({
    email: "user@gmail.com",
    password: "User@123",
    role: "",
  });

  // -----------------------------
  // Input change
  // -----------------------------
  const onChangeValueController = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Role selection
  // -----------------------------
  const handleRoleChange = (role) => {
    setInput((prev) => ({
      ...prev,
      role,
      email:
        role === "recruiter"
          ? "admin@gmail.com"
          : "user@gmail.com",
      password:
        role === "recruiter"
          ? "Admin@123"
          : "User@123",
    }));
  };

  // -----------------------------
  // Login
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select your role");
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setAuthUser(res?.data?.data));

        toast.success(res?.data?.message || "Login successful");

        navigate("/");
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

  // -----------------------------
  // Redirect if already logged in
  // -----------------------------
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

          {/* =========================================
              LEFT SIDE
          ========================================= */}
          <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-12 text-white">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute right-20 bottom-20 h-24 w-24 rounded-full bg-white/5" />

            <div className="relative z-10 flex flex-col justify-between w-full">

              <div>
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Smart Career Platform</span>
                </div>

                <h2 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                  Find opportunities.
                  <br />
                  Build your future.
                </h2>

                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                  Connect with top companies, discover exciting opportunities,
                  and take the next step in your career journey.
                </p>
              </div>

              <div className="space-y-4">

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Discover Opportunities
                    </p>
                    <p className="text-sm text-blue-100">
                      Explore jobs that match your skills.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Secure & Reliable
                    </p>
                    <p className="text-sm text-blue-100">
                      Your account and information stay protected.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT SIDE - LOGIN FORM
          ========================================= */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md"
            >

              {/* Header */}
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Sign in to continue to your account.
                </p>
              </div>

              {/* Role selection */}
              <div className="mb-6">
                <Label className="mb-3 block text-sm font-semibold text-slate-700">
                  Continue as
                </Label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Student */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange("student")}
                    className={`group flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
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
                    onClick={() => handleRoleChange("recruiter")}
                    className={`group flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
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

              {/* Email */}
              <div className="mb-5">
                <Label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </Label>

                <Input
                  id="email"
                  value={input.email}
                  onChange={onChangeValueController}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>

                  <button
                    type="button"
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    onClick={() => {
                      toast.info("Password reset feature coming soon.");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    value={input.password}
                    onChange={onChangeValueController}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 pr-12 transition focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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
              </div>

              {/* Demo account indicator */}
              {input.role && (
                <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
                  <p className="text-xs text-blue-700">
                    <span className="font-semibold">
                      Demo {input.role} account:
                    </span>{" "}
                    credentials are pre-filled for you.
                  </p>
                </div>
              )}

              {/* Login button */}
              <Button
                type="submit"
                disabled={loading}
                className="group h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              {/* Signup */}
              <p className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Create an account
                </Link>
              </p>

              {/* Mobile trust text */}
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 lg:hidden">
                <ShieldCheck className="h-4 w-4" />
                Secure and reliable job platform
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
