import { motion } from "framer-motion";

const array = [
  "icon1.png",
  "icon2.png",
  "icon11.png",
  "icon4.png",
  "icon5.png",
  "icon6.jpg",
  "icon7.png",
  "icon8.png",
  "icon9.webp",
  "icon10.webp",
  "icon3.jpeg",
];

const SlideIcons = () => {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-8">
      <div className="mx-auto max-w-7xl overflow-hidden">

        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          Trusted by professionals & growing teams
        </p>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max items-center gap-10"
          >
            {[...array, ...array].map((item, index) => (
              <div
                key={index}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={item}
                  alt="company"
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SlideIcons;