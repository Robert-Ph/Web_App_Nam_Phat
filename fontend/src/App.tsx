import { RouterProvider } from "react-router-dom";
import router from "./layout/Router";
import "./App.css";
// import {BrowserRouter as Route, Router,  Routes} from "react-router-dom";

// import Login from "./pages/login/Login.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    //   <Router>
    //       <Routes>
    //           <Route path="/" element={<Login />} />
    //       </Routes>
    //   </Router>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-right" />
    </AuthProvider>
  );
}

export default App;
