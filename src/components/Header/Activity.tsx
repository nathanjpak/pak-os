import { useContext, useEffect, useMemo, useState } from "react";
import WindowsContext from "../../contexts/windowsContext";

const Activity = () => {
  const { focusWindow } = useContext(WindowsContext);
  const [activityName, setActivityName] = useState("");

  const activityMap = useMemo(() => {
    return new Map<string, string>([
      ["folder", "Files"],
      ["html", "Browser"],
      ["md", "Markdown Viewer"],
      ["pdf", "PDF Reader"],
    ]);
  }, []);

  useEffect(() => {
    if (!focusWindow) {
      setActivityName("");
      return;
    }
    const fileType = focusWindow.split(".")[1] || "folder";
    setActivityName(activityMap.get(fileType) || "");
  }, [focusWindow]);

  return (
    <div>{activityName.length > 0 && `${activityName}\u00a0\u00a0\u25be`}</div>
  );
};

export default Activity;
