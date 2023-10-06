import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignUp from "./pages/SignUp/SignUp.jsx";
import LoginUser from "./pages/LoginUser/LoginUser.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/protectedRoute.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/userContext";
import { ClientsProvider } from "./context/clientsContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);



root.render(
  <StrictMode>
    <UserProvider>
      <ClientsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginUser />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
          </Routes>
        </Router>
      </ClientsProvider>
      <ToastContainer />
    </UserProvider>
  </StrictMode>
);
