import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CareerCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-20 bg-slate-950" />

      {/* Gradient glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="absolute -left-40 top-1/3 -z-10 h-[350px] w-[350px] rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="absolute -right-40 bottom-0 -z-10 h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-[120px]" />

      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
        {/* Top glow */}
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

        <div className="grid items-center gap-12 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-2 lg:px-16 lg:py-20">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300"
            >
              <Sparkles className="h-4 w-4" />
              Your next opportunity starts here
            </motion.div>

            {/* Heading */}
            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find a job that
              <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                moves you forward.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Discover opportunities that match your skills, connect with
              companies, and take the next step in your career journey.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/jobs")}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-50"
              >
                Explore Jobs
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
              >
                Create Profile
              </motion.button>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Discover relevant jobs
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Connect with companies
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT VISUAL ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-xl"
          >
            {/* Glow behind card */}
            <div className="absolute inset-10 rounded-full bg-blue-500/20 blur-[80px]" />

            {/* Main dashboard card */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-3xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6"
            >
              {/* Browser header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-slate-500">
                  DreamIT
                </div>
              </div>

              {/* Search */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <Search className="h-4 w-4 text-slate-500" />

                <span className="text-sm text-slate-400">
                  Search jobs, skills or companies...
                </span>
              </div>

              {/* Job card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
                      <BriefcaseBusiness className="h-5 w-5 text-white" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        Full Stack Developer
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Technology Company · India
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    New
                  </span>
                </div>

                {/* Skills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {["React", "Node.js", "MongoDB", "TypeScript"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">Salary</p>
                    <p className="mt-1 font-semibold text-white">
                      ₹8–12 LPA
                    </p>
                  </div>

                  <button className="rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-400">
                    Apply Now
                  </button>
                </div>
              </motion.div>

              {/* Bottom stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />

                    <span className="text-xs text-slate-500">
                      Opportunities
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-bold text-white">
                    Explore
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-400" />

                    <span className="text-xs text-slate-500">
                      Smart matching
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-bold text-white">
                    Personalized
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ================= FLOATING CARD 1 ================= */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-4 top-20 hidden rounded-2xl border border-white/10 bg-slate-900/90 p-3 shadow-xl backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Application sent
                  </p>

                  <p className="text-[10px] text-slate-500">
                    Successfully submitted
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ================= FLOATING CARD 2 ================= */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 bottom-20 hidden rounded-2xl border border-white/10 bg-slate-900/90 p-3 shadow-xl backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-400/10">
                  <Sparkles className="h-4 w-4 text-violet-400" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Great match
                  </p>

                  <p className="text-[10px] text-slate-500">
                    Based on your profile
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerCTA;