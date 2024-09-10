import { RouterProvider } from "react-router-dom";
import router from "./layout/Router";
import "./App.css";
// import {BrowserRouter as Route, Router,  Routes} from "react-router-dom";

// import Login from "./pages/login/Login.tsx";

function App() {
  return (
    //   <Router>
    //       <Routes>
    //           <Route path="/" element={<Login />} />
    //       </Routes>
    //   </Router>

    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
