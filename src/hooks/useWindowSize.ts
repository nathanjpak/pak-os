import { MutableRefObject, useEffect, useState } from "react";

export interface IComponentSize {
  width: number | undefined;
  height: number | undefined;
}

const useComponentSize = (refContainer: MutableRefObject<any>) => {
  const [componentSize, setComponentSize] = useState<IComponentSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setComponentSize({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [refContainer]);

  return componentSize;
};

export default useComponentSize;
