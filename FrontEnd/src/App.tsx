import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "@/pages";
import Register from "./pages/Register.tsx";
import {Toaster} from "sonner";

function App() {
  function PrivateRoute({children}) {
    const logged = localStorage.getItem("jwt");
    return logged ? children : <Navigate to="/"/>;
  }

  return (
    <>
      <Toaster richColors={true}/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
