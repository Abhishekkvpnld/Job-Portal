import { useState, useEffect } from "react";

const array = [1, 2, 3, 4, 5, 6, 7];

const SlideIcons = () => {
  const [start, setStart] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStart((prev) => (prev + 1) % array.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-14 overflow-hidden justify-center">
      {array
        .concat(array) 
        .slice(start, start + 5).map((item, index) => (
                    <img className={`${index === 3 ? "border-red-700 border-2" : ''} rounded-full border border-slate-500 w-16 h-16`} key={index} src="/vite.svg" alt="img" />
                ))
            }

        </div>
    )
}

export default SlideIcons