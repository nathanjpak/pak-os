import { PropsWithChildren, useEffect, useRef } from "react";

interface IClickDetectWrapperProps {
  callback: () => void;
}

const ClickDetectWrapper = (
  props: PropsWithChildren<IClickDetectWrapperProps>
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      )
        props.callback();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return <div ref={wrapperRef}>{props.children}</div>;
};

export default ClickDetectWrapper;
