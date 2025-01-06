import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import Jobs from './components/pages/Jobs';
import Browse from './components/pages/Browse';
import Profile from './components/shared/Profile';


const App = () => {


  const createRoutes = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/jobs",
      element:<Jobs/>
    },
    {
      path:"/browse",
      element:<Browse/>
    },
    {
      path:"/profile",
      element:<Profile/>
    }
  ])


  return (
    <>
      <RouterProvider router={createRoutes}/>
    </>
  )
}

export default App;