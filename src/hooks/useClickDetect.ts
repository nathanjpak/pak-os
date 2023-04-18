import { MutableRefObject, useEffect } from "react";

const useClickDetect = (
  ref: MutableRefObject<any>,
  callback: () => void,
  condition = true
) => {
  useEffect(() => {
    const handleClickOutsideElement = () => {
      if (ref.current && !ref.current.contains(event?.target)) callback();
    };

    if (condition) {
      document.addEventListener("mousedown", handleClickOutsideElement);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideElement);
    };
  }, [condition]);
};

export default useClickDetect;
