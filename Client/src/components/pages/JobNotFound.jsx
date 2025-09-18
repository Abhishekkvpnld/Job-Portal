import { motion } from "framer-motion";
import { SearchX } from "lucide-react"; // nice "not found" icon

const JobNotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-600"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <SearchX size={60} className="mb-4 text-gray-500" />
      <h2 className="text-2xl font-semibold mb-2">No Jobs Found</h2>
      <p className="text-gray-500 max-w-md">
        We couldn’t find any jobs matching your search. Try adjusting your filters or search query.
      </p>
    </motion.div>
  );
};

export default JobNotFound;
