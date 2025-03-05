import { ReactNode } from "react";
import Footer from "./components/footer";
import Header from "./components/header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col flex-1 h-screen overflow-y-auto">
      {/* Header */}
      <Header />

      <div className="flex flex-1 w-full">
        {/* Sidebar - Menu Left */}
        <div className="bg-gray-800 text-white w-64 p-5">
          <div className="text-xl font-semibold mb-6">Menu</div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-full relative bg-gray-50 p-10">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
