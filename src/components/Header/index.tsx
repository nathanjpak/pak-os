import Activity from "./Activity";
import Clock from "./Clock";

export const Header = () => {
  return (
    <div className="relative bg-dark-navy text-slate-50 h-fit w-full flex flex-none justify-start px-4 gap-4">
      <p>Activities</p>
      <Activity />
      <Clock />
    </div>
  );
};
