import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard, Home, Register} from "@/pages";
import {Toaster} from "sonner";
import {getCookie} from "@/utils/http.ts";
import type {ReactNode} from "react";

function PrivateRoute({children}: {children: ReactNode}) {
  const logged = getCookie("jwt");
  return logged ? children : <Navigate to="/"/>;
}

function App() {

  return (
    <>
      <Toaster richColors={true}/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <PrivateRoute>
          <Route path={'/dashboard'} element={<Dashboard/>}/>
        </PrivateRoute>
      </Routes>
    </>
  )
}

export default App
