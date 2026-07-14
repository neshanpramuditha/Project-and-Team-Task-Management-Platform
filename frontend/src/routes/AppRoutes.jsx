import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import Comments from "../pages/Comments";
import Notifications from "../pages/Notifications";
import Activity from "../pages/Activity";
import Profile from "../pages/Profile";
import Users from "../pages/Users";

import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Logged-in users */}

        <Route element={<ProtectedRoute />}>

          <Route element={<MainLayout />}>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/projects"
              element={<Projects />}
            />

            <Route
              path="/tasks"
              element={<Tasks />}
            />

            <Route
              path="/comments"
              element={<Comments />}
            />

            <Route
              path="/notifications"
              element={<Notifications />}
            />

            <Route
              path="/activity"
              element={<Activity />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* ADMIN ONLY */}

            <Route element={<AdminRoute />}>

              <Route
                path="/users"
                element={<Users />}
              />

            </Route>

          </Route>

        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;