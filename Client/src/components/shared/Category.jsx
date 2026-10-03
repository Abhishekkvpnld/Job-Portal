import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";
import { categoryList } from "../../utils/data";
import {
  Code2,
  Database,
  Palette,
  BarChart3,
  Megaphone,
  BriefcaseBusiness,
  Settings,
  HeartPulse,
} from "lucide-react";

const icons = [
  Code2,
  Database,
  Palette,
  BarChart3,
  Megaphone,
  BriefcaseBusiness,
  Settings,
  HeartPulse,
];

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold text-blue-600">
              EXPLORE OPPORTUNITIES
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Find jobs by category
            </h2>

            <p className="mt-3 max-w-xl text-sm text-slate-500">
              Explore opportunities across different industries and
              find the role that matches your skills.
            </p>
          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            View all jobs →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categoryList.slice(0, 8).map((cat, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.button
                key={index}
                onClick={() => searchJobHandler(cat)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={20} />
                </div>

                <h3 className="font-semibold text-slate-900">
                  {cat}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Explore opportunities →
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;