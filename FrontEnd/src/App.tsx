import './App.css'

import {useEffect, useState} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {Dashboard, Home, Register} from "@/pages";
import {Toaster} from "sonner";
import {getCookie} from "@/utils/http.ts";
import {useLoginServices} from "@/services";

function PrivateRoute() {
  const {verifyToken} = useLoginServices();
  const [isLoading, setIsLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function validate() {
      const token = getCookie("jwt");

      if (!token) {
        setAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        const result = await verifyToken(token);

        setAuthorized(result.statusCode === 200);
      } catch {
        setAuthorized(false);
      }

      setIsLoading(false);
    }

    validate();
  }, []);

  if (isLoading) return null;

  return authorized ? <Outlet/> : <Navigate to="/" replace/>;
}

function App() {
  return (
    <>
      <Toaster richColors={true}/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>


        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
