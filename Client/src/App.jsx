import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import Jobs from './components/pages/Jobs';
import Browse from './components/pages/Browse';
import Profile from './components/shared/Profile';
import JobDescription from './components/pages/JobDescription';
import Companies from './components/admin/Companies';
import CreateCompany from './components/admin/CreateCompany';
import CompanyDetails from './components/admin/CompanyDetails';
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';


const App = () => {


  const createRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/jobs",
      element: <Jobs />
    },
    {
      path: "/description/:id",
      element: <JobDescription />
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "/profile",
      element: <Profile />
    },

    //Admin
    {
      path: "/admin/companies",
      element: <Companies />
    },
    {
      path: "/admin/companies/create",
      element: <CreateCompany/>
    },
    {
      path: "/admin/companies/:id",
      element: <CompanyDetails/>
    },
    {
      path:"/admin/jobs",
      element:<AdminJobs/>
    },
    {
      path:"/admin/jobs/create",
      element:<PostJob/>
    },
    {
      path:"/admin/jobs/:id/applicants",
      element:<Applicants/>
    }

  ])


  return (
    <>
      <RouterProvider router={createRoutes} />
    </>
  )
}

export default App;