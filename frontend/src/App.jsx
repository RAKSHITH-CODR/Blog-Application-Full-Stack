import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout"; 
import DashboardLayout from "./components/DashboardLayout"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import YourBlog from "./pages/YourBlog";
import Comments from "./pages/Comments";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import BlogView from "./pages/BlogView";
import SearchList from "./pages/SearchList";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "blogs", element: <Blogs /> },
      { path: "search", element: <SearchList /> },
      { path: "blogs/:blogId", element: <BlogView /> },
    ],
  },
  
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        element: <Dashboard />, 
        children: [
          { index: true, element: <Profile /> },
          { path: "profile", element: <Profile /> },
          { path: "your-blog", element: <YourBlog /> },
          { path: "comments", element: <Comments /> },
          { path: "write-blog", element: <CreateBlog /> },
          { path: "write-blog/:blogId", element: <UpdateBlog /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Layout footer={false} />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/signup",
    element: <Layout footer={false} />,
    children: [{ index: true, element: <Signup /> }],
  },
]);

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
