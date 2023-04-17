import { DockLauncher } from "./components/DockLauncher";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <div className="flex flex-col bg-green-100 w-screen h-screen bg-default-static bg-cover bg-bottom lg:bg-auto lg:bg-repeat-x">
      <Header />
      <div className="grow">
        <DockLauncher />
      </div>
    </div>
  );
};
