import { useEffect, useMemo, useState } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Filter,
  MapPin,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    icon: MapPin,
    options: [
      "Kerala",
      "Bangalore",
      "Chennai",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Delhi",
      "Noida",
      "Gurgaon",
      "Kochi",
      "Calicut",
      "Remote",
    ],
  },
  {
    filterType: "Industry",
    icon: BriefcaseBusiness,
    options: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "MERN Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Next.js Developer",
      "Software Engineer",
      "UI/UX Designer",
      "Data Analyst",
      "DevOps Engineer",
    ],
  },
  {
    filterType: "Salary",
    icon: CircleDollarSign,
    options: [
      "0-10k",
      "11-40k",
      "41-80k",
      "81k-Above",
    ],
  },
  {
    filterType: "Job Type",
    icon: Clock3,
    options: [
      "Full Time",
      "Part Time",
      "Contract",
      "Internship",
      "Freelance",
    ],
  },
  {
    filterType: "Work Mode",
    icon: Building2,
    options: [
      "On-site",
      "Hybrid",
      "Remote",
    ],
  },
  {
    filterType: "Experience",
    icon: Sparkles,
    options: [
      "Fresher",
      "0-1 Years",
      "1-3 Years",
      "3-5 Years",
      "5+ Years",
    ],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState({});
  const [openSections, setOpenSections] = useState({
    Location: true,
    Industry: true,
    Salary: true,
    "Job Type": false,
    "Work Mode": false,
    Experience: false,
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const clearFilter = (filterType) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      delete updated[filterType];
      return updated;
    });
  };

  const toggleSection = (filterType) => {
    setOpenSections((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const activeFilterCount = Object.keys(selectedFilters).length;

  /*
   * Your current Redux searchQuery is a single string.
   *
   * For now we dispatch the selected values as one searchable string.
   * Example:
   * "Kerala Frontend Developer Remote"
   *
   * Later, for production filtering, you can store these
   * independently in Redux and filter by exact fields.
   */
  const searchValue = useMemo(() => {
    return Object.values(selectedFilters).join(" ");
  }, [selectedFilters]);

  useEffect(() => {
    dispatch(setSearchQuery(searchValue));
  }, [searchValue, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="border-b border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-md shadow-blue-500/20">
              <Filter className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Filter Jobs
              </h2>

              <p className="text-xs text-slate-500">
                Find your perfect opportunity
              </p>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-bold text-white"
            >
              {activeFilterCount}
            </motion.div>
          )}
        </div>

        {/* Active filters */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(
                  ([filterType, value]) => (
                    <motion.button
                      key={filterType}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => clearFilter(filterType)}
                      className="group flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                    >
                      {value}

                      <X className="h-3 w-3 transition-transform group-hover:rotate-90" />
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          FILTER SECTIONS
      ===================================================== */}
      <div className="max-h-[calc(100vh-180px)] overflow-y-auto p-3">
        <div className="space-y-2">
          {filterData.map((data) => {
            const Icon = data.icon;
            const isOpen = openSections[data.filterType];
            const selectedValue = selectedFilters[data.filterType];

            return (
              <div
                key={data.filterType}
                className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50"
              >
                {/* Section header */}
                <button
                  type="button"
                  onClick={() => toggleSection(data.filterType)}
                  className="flex w-full items-center justify-between px-3 py-3 text-left transition-colors hover:bg-white"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        selectedValue
                          ? "bg-blue-100 text-blue-600"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <span className="block text-sm font-semibold text-slate-800">
                        {data.filterType}
                      </span>

                      {selectedValue && (
                        <span className="block max-w-[130px] truncate text-[10px] font-medium text-blue-600">
                          {selectedValue}
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </motion.div>
                </button>

                {/* Options */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-3 pb-3 pt-2">
                        <RadioGroup
                          value={selectedValue || ""}
                          onValueChange={(value) =>
                            handleFilterChange(data.filterType, value)
                          }
                          className="space-y-1"
                        >
                          {data.options.map((option) => {
                            const id = `${data.filterType}-${option}`
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-");

                            const isSelected =
                              selectedValue === option;

                            return (
                              <motion.div
                                key={option}
                                whileHover={{ x: 2 }}
                                className={`flex items-center rounded-lg px-2 py-2 transition-all ${
                                  isSelected
                                    ? "bg-blue-50"
                                    : "hover:bg-white"
                                }`}
                              >
                                <RadioGroupItem
                                  id={id}
                                  value={option}
                                  className="border-slate-300 text-blue-600"
                                />

                                <Label
                                  htmlFor={id}
                                  className={`ml-2.5 flex-1 cursor-pointer text-xs ${
                                    isSelected
                                      ? "font-semibold text-blue-700"
                                      : "font-medium text-slate-600"
                                  }`}
                                >
                                  {option}
                                </Label>

                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="h-1.5 w-1.5 rounded-full bg-blue-600"
                                  />
                                )}
                              </motion.div>
                            );
                          })}
                        </RadioGroup>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <AnimatePresence>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="border-t border-slate-100 bg-slate-50 p-3"
          >
            <button
              onClick={clearAllFilters}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear All Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterCard;