import { useEffect, useState } from "react";

export const useIsMobile = (width = 600) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < width);

  useEffect(() => {
    const listener = () => setIsMobile(window.innerWidth < width);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [width]);

  return isMobile;
};
