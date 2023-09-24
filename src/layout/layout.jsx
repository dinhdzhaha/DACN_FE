import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout/index";
import AdminLayout from "./AdminLayout";

import { publicRoute } from "../routes/index";

function Layout() {
  return (
    <div className="main">
      <Router>
        <div className="app">
          <Routes>
            {publicRoute.map((route, index) => {
              const Layout =
                route.layout === "admin" ? AdminLayout : UserLayout;
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
    </div>
  );
}

export default Layout;
