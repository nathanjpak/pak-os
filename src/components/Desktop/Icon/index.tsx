interface DesktopIconProps {
  svg: string;
  fileName: string;
}

export const DesktopIcon = ({ svg, fileName }: DesktopIconProps) => {
  return (
    <div className="flex flex-col pt-2 h-[120px] w-[120px] justify-start rounded hover:bg-white/50">
      <img className="self-center" src={svg} height={"40px"} width={"40px"} />
      <div className="text-center">{fileName}</div>
    </div>
  );
};
