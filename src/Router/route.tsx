import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import Home from "../pages/Home/Home";
import * as action from '../actions/index';
import { useUserStore } from "../app/store";
import { useMemo } from "react";

function RouterWrapper() {

  const user = useUserStore((state: any) => state.user)

  const isUserExist = useMemo(() => typeof user === 'string' ? false : true, [user])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/*" element={isUserExist ? <Login /> : <Home />} />
        <Route path="/register" action={action.register} element={isUserExist ? <Register /> : <Home />} />
        <Route path="/" element={!isUserExist ? <Home /> : <Register />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />
}

export default RouterWrapper;