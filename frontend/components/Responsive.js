import React from "react";

export default function useViewport() {
  if (typeof window !== "undefined") {
    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { width };
  } else {
    //   const [width, setWidth] = React.useState(window.innerWidth);
    // React.useEffect(() => {
    //   const handleWindowResize = () => setWidth(window.innerWidth);
    //   window.addEventListener("resize", handleWindowResize);
    //   return () => window.removeEventListener("resize", handleWindowResize);
    // }, []);
    // return {width};
  }
}
