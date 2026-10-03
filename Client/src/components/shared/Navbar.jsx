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
      const res = await axios.get(
        `${USER_API_END_POINT}/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(null));
        setMobileOpen(false);
        navigate("/");

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Logout failed"
      );
    }
  };

  // =========================
  // NAVIGATION
  // =========================
  const candidateLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Find Jobs",
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

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
      <nav className="border-b border-slate-100">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* =====================================================
              LOGO
          ====================================================== */}
          <Link
            to="/"
            className="group flex items-center"
          >
            <div className="flex items-center">
              <span className="text-[25px] font-black tracking-[-0.06em] text-slate-950">
                Dream
              </span>

              <span className="text-[25px] font-black tracking-[-0.06em] text-blue-600">
                IT
              </span>

              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="ml-1.5 mt-5 h-1.5 w-1.5 rounded-full bg-blue-600"
              />
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <div className="hidden md:flex">
            <div className="flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{
                        y: -1,
                      }}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "text-blue-600"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 -z-10 rounded-full bg-blue-50"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <Icon
                        className={`h-4 w-4 ${
                          active
                            ? "text-blue-600"
                            : "text-slate-400"
                        }`}
                      />

                      {link.name}

                      {active && (
                        <motion.span
                          initial={{
                            scale: 0,
                          }}
                          animate={{
                            scale: 1,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-blue-600"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}
          <div className="hidden items-center gap-3 md:flex">
            {!user ? (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="rounded-full px-4 font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Button className="group rounded-full bg-slate-950 px-5 font-semibold text-white shadow-lg shadow-slate-950/10 transition-all hover:bg-blue-600 hover:shadow-blue-600/20">
                      Get Started

                      <Sparkles className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    </Button>
                  </motion.div>
                </Link>
              </>
            ) : (
              /* =================================================
                 PROFILE
              ================================================== */
              <Popover>
                <PopoverTrigger asChild>
                  <button className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-3 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "/profile.png"
                        }
                        alt="avatar"
                      />
                    </Avatar>

                    <div className="max-w-[110px] text-left">
                      <p className="truncate text-xs font-bold text-slate-800">
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
                  className="w-72 overflow-hidden rounded-2xl border-slate-200 bg-white p-0 shadow-2xl"
                >
                  {/* Header */}
                  <div className="border-b border-slate-100 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11">
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto ||
                            "/profile.png"
                          }
                          alt="avatar"
                        />
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {user?.fullname}
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          {user?.profile?.bio ||
                            "Welcome to DreamIT"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold capitalize text-blue-600">
                      {user?.role}
                    </div>
                  </div>

                  {/* Menu */}
                  <div className="p-2">
                    {user?.role === "student" && (
                      <button
                        onClick={() => navigate("/profile")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-slate-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                          <UserRound className="h-4 w-4 text-blue-600" />
                        </span>

                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            My Profile
                          </p>

                          <p className="text-[10px] text-slate-400">
                            View and edit profile
                          </p>
                        </div>
                      </button>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-red-50"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                        <LogOut className="h-4 w-4 text-red-500" />
                      </span>

                      <div>
                        <p className="text-sm font-medium text-red-600">
                          Logout
                        </p>

                        <p className="text-[10px] text-red-400">
                          Sign out of DreamIT
                        </p>
                      </div>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* =====================================================
              MOBILE BUTTON
          ====================================================== */}
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: -90,
                    opacity: 0,
                  }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="overflow-hidden border-t border-slate-100 md:hidden"
            >
              <div className="px-4 pb-5 pt-3">
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
                          x: -10,
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
                          onClick={() =>
                            setMobileOpen(false)
                          }
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                            active
                              ? "bg-blue-50 text-blue-600"
                              : "text-slate-600 hover:bg-slate-50"
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

                {/* Guest buttons */}
                {!user && (
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                    <Link
                      to="/login"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-xl"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                    >
                      <Button className="w-full rounded-xl bg-slate-950 hover:bg-blue-600">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Logged user */}
                {user && (
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
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
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
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
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;