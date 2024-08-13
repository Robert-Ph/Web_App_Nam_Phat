
import {BrowserRouter as Route, Router,  Routes} from "react-router-dom";
import './App.css'
import Login from "./pages/login/Login.tsx";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
          </Routes>
      </Router>
  );
}

export default App;
