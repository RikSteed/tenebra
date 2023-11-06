import { useEffect, useState } from "react";

const useWindowDimension = () => {
  const [dimension, setDimension] = useState({ width: innerWidth, height: innerHeight });
  useEffect(() => {
    const handleResize = () => {
      setDimension({ width: innerWidth, height: innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return dimension;
};
export default useWindowDimension;
