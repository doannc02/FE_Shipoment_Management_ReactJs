import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/main";
import IndexPage from "./pages/homePage/index.page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddNewShipment from "./views/HomePage/AddNew";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/add-new-shipment" element={<AddNewShipment />} />
            <Route path="/detail-shipment/:ShipmentId" element={<AddNewShipment />} />
            <Route path="/about" element={<>About</>} />
          </Routes>
        </MainLayout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
