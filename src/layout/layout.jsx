import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserLayout from "./UserLayout/index";
import AdminLayout from "./AdminLayout";
import LayoutLogin from "./Login";
import { publicRoute } from "../routes/index";
import { UserProvider } from "../context/UserContext";
import { StyledEngineProvider } from '@mui/material/styles';
import "react-toastify/dist/ReactToastify.css";


function Layout() {
  return (
    <div className="main">
      {/* <React.StrictMode> */}
        <UserProvider>
        <StyledEngineProvider injectFirst>
          <ToastContainer />
          <Router>
            <div className="app">
              <Routes>
                {publicRoute.map((route, index) => {
                  const Layout =
                    route.layout === "admin" ? AdminLayout : (route.layout === "login" ? LayoutLogin : UserLayout);
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>
            </div>
          </Router>
        </StyledEngineProvider>
        </UserProvider>
      {/* </React.StrictMode> */}
    </div>
  );
}

export default Layout;
