import { createContext } from "react";

interface IDesktopSize {
  width: number;
  height: number;
}

const DesktopSizeContext = createContext({
  width: 0,
  height: 0,
});

export default DesktopSizeContext;
