import {
  BriefcaseBusiness,
  ChevronDown,
  Home,
  LogIn,
  LogOut,
  Menu,
  Search,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

import { USER_API_END_POINT } from "@/utils/constants";
import { setAuthUser } from "@/redux/authSlice";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  // =========================
  // LOGOUT
  // =========================
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        setMobileOpen(false);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Logout failed"
      );
    }
  };

  // =========================
  // NAVIGATION LINKS
  // =========================
  const candidateLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Browse",
      path: "/browse",
      icon: Search,
    },
  ];

  const recruiterLinks = [
    {
      name: "Companies",
      path: "/admin/companies",
      icon: BriefcaseBusiness,
    },
    {
      name: "Jobs",
      path: "/admin/jobs",
      icon: BriefcaseBusiness,
    },
  ];

  const links =
    user?.role === "recruiter"
      ? recruiterLinks
      : candidateLinks;

  // =========================
  // ACTIVE ROUTE
  // =========================
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-6">
      <motion.nav
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-7xl"
      >
        {/* Glow behind navbar */}
        <div className="absolute -inset-1 -z-10 rounded-[1.3rem] bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-cyan-500/10 blur-xl" />

        <div className="relative overflow-hidden rounded-[1.2rem] border border-slate-200/70 bg-white/85 shadow-lg shadow-slate-900/[0.04] backdrop-blur-2xl">
          {/* Top gradient line */}
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

          <div className="flex h-[68px] items-center justify-between px-4 sm:px-6">
            {/* ================= LOGO ================= */}
            <Link
              to="/"
              className="group flex items-center"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center"
              >
                <span className="text-[22px] font-black tracking-[-0.04em] text-slate-900 sm:text-2xl">
                  Dream
                </span>

                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-[22px] font-black tracking-[-0.04em] text-transparent sm:text-2xl">
                  IT
                </span>

                <motion.span
                  animate={{
                    scale: [1, 1.35, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="ml-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                />
              </motion.div>
            </Link>

            {/* ================= DESKTOP NAV ================= */}
            <div className="hidden items-center md:flex">
              <div className="flex items-center rounded-full border border-slate-200/70 bg-slate-50/70 p-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative"
                    >
                      {active && (
                        <motion.div
                          layoutId="navbar-active"
                          className="absolute inset-0 rounded-full bg-white shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <div
                        className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                          active
                            ? "text-blue-600"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />

                        {link.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="hidden items-center gap-2 md:flex">
              {!user ? (
                <>
                  {/* Login */}
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="group rounded-full px-4 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    >
                      <LogIn className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                      Login
                    </Button>
                  </Link>

                  {/* Get Started */}
                  <Link to="/signup">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button className="group relative overflow-hidden rounded-full border-0 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 px-5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30">
                        <span className="relative z-10 flex items-center">
                          Get Started
                          <Sparkles className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
                        </span>

                        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                      </Button>
                    </motion.div>
                  </Link>
                </>
              ) : (
                /* ================= PROFILE ================= */
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
                      <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto ||
                            "/profile.png"
                          }
                          alt="avatar"
                        />
                      </Avatar>

                      <div className="hidden max-w-[120px] text-left lg:block">
                        <p className="truncate text-xs font-semibold text-slate-800">
                          {user?.fullname}
                        </p>

                        <p className="text-[10px] capitalize text-slate-400">
                          {user?.role}
                        </p>
                      </div>

                      <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform group-data-[state=open]:rotate-180" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    sideOffset={10}
                    className="w-80 overflow-hidden rounded-2xl border-slate-200/80 bg-white/95 p-0 shadow-2xl backdrop-blur-xl"
                  >
                    {/* Profile header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 p-5 text-white">
                      {/* Background glow */}
                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/30 blur-2xl" />

                      <div className="relative flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-white/30 shadow-lg">
                          <AvatarImage
                            src={
                              user?.profile?.profilePhoto ||
                              "/profile.png"
                            }
                            alt="avatar"
                          />
                        </Avatar>

                        <div className="min-w-0">
                          <h2 className="truncate text-sm font-bold">
                            {user?.fullname}
                          </h2>

                          <p className="truncate text-xs text-slate-300">
                            {user?.profile?.bio ||
                              "Welcome to DreamIT"}
                          </p>

                          <span className="mt-1.5 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[10px] capitalize text-blue-200">
                            {user?.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4">
                      {user?.role === "student" && (
                        <button
                          onClick={() => navigate("/profile")}
                          className="mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                            <UserRound className="h-4 w-4 text-blue-600" />
                          </div>

                          <div>
                            <p>My Profile</p>
                            <p className="text-[10px] font-normal text-slate-400">
                              Manage your profile
                            </p>
                          </div>
                        </button>
                      )}

                      <button
                        onClick={logoutHandler}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                          <LogOut className="h-4 w-4 text-red-500" />
                        </div>

                        <div>
                          <p>Logout</p>
                          <p className="text-[10px] font-normal text-red-400">
                            Sign out of your account
                          </p>
                        </div>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {/* ================= MOBILE BUTTON ================= */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ================= MOBILE MENU ================= */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="overflow-hidden md:hidden"
              >
                <div className="border-t border-slate-200/70 px-4 pb-4 pt-3">
                  {/* Links */}
                  <div className="space-y-1">
                    {links.map((link, index) => {
                      const Icon = link.icon;
                      const active = isActive(link.path);

                      return (
                        <motion.div
                          key={link.path}
                          initial={{
                            opacity: 0,
                            x: -15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.05,
                          }}
                        >
                          <Link
                            to={link.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                              active
                                ? "bg-blue-50 text-blue-600"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <Icon className="h-4 w-4" />

                            {link.name}

                            {active && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Logged out buttons */}
                  {!user && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3"
                    >
                      <Link
                        to="/login"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full rounded-xl"
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          Login
                        </Button>
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600">
                          Get Started
                        </Button>
                      </Link>
                    </motion.div>
                  )}

                  {/* Logged in mobile profile */}
                  {user && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-3 border-t border-slate-200 pt-3"
                    >
                      <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              user?.profile?.profilePhoto ||
                              "/profile.png"
                            }
                            alt="avatar"
                          />
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {user?.fullname}
                          </p>

                          <p className="text-xs capitalize text-slate-400">
                            {user?.role}
                          </p>
                        </div>
                      </div>

                      {user?.role === "student" && (
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setMobileOpen(false);
                          }}
                          className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                          <UserRound className="h-4 w-4" />
                          My Profile
                        </button>
                      )}

                      <button
                        onClick={logoutHandler}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;