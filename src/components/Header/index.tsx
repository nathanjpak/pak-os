import Clock from "./Clock";

export const Header = () => {
  return (
    <div className="bg-dark-navy text-slate-50 h-fit w-full flex flex-none justify-between">
      <p>Activities</p>
      <Clock />
      <p>Icons</p>
    </div>
  );
};
