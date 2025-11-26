import './App.css'

import {type ReactNode, useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard, Home, Register} from "@/pages";
import {Toaster} from "sonner";
import {getCookie} from "@/utils/http.ts";
import {useLoginServices} from "@/services";

function PrivateRoute({children}: { children: ReactNode, }) {
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

  return authorized ? children : <Navigate to="/"/>;
}

function App() {
  return (
    <>
      <Toaster richColors={true}/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App;
