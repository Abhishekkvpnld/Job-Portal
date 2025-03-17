import { useState, useEffect } from "react";

const array = ["icon1.png", "icon2.png", "icon11.png", "icon4.png", "icon5.png", "icon6.jpg", "icon7.png", "icon8.png", "icon9.webp", "icon10.webp", "icon3.jpeg"];

const SlideIcons = () => {
  const [start, setStart] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStart((prev) => (prev + 1) % array.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [start]);

  return (
    <div className="flex items-center gap-14 overflow-hidden justify-center">
      {array
        .concat(array)
        .slice(start, start + 5).map((item, index) => (
          <img className={`rounded-full border border-slate-500 w-12 h-12 md:w-16 md:h-16`} key={index} src={item} alt="img" />
        ))
      }

    </div>
  )
}

export default SlideIcons