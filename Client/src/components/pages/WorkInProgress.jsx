import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Clock3,
  Construction,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const WorkInProgress = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            {/* Top gradient */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500" />

            <div className="px-6 py-12 text-center sm:px-12 sm:py-16">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 ring-8 ring-blue-50/60"
              >
                <Construction className="h-11 w-11 text-indigo-600" />
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700"
              >
                <Wrench className="h-4 w-4" />
                Work in Progress
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
              >
                Something great is
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  being built.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg"
              >
                We&apos;re currently working on this feature to make your
                experience better. It&apos;ll be available soon.
              </motion.p>

              {/* Progress */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mx-auto mt-9 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      Development Progress
                    </span>
                  </div>

                  <span className="text-sm font-bold text-indigo-600">
                    70%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{
                      delay: 0.7,
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Core features
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    UI design
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 className="h-4 w-4 text-amber-500" />
                    Final testing
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 className="h-4 w-4 text-amber-500" />
                    Deployment
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
              >
                <Button
                  type="button"
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="h-11 rounded-xl border-slate-200 px-6 font-semibold"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>

                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  className="h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 font-semibold shadow-lg shadow-blue-600/20 transition-all hover:from-blue-700 hover:to-indigo-700"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </motion.div>

              {/* Bottom note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10 flex items-center justify-center gap-2 text-sm text-slate-400"
              >
                <Bell className="h-4 w-4" />
                Stay tuned for the upcoming update
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            DreamIT • Building a better job-search experience
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkInProgress;