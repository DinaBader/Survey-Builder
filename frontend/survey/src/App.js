import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Index";
import Login from "./pages/Login/Index"
import Signup from './pages/Signup/Index';
import AdminDashboard from "./pages/AdminDashboard/Index"
import AddSurvey from "./pages/AddSurvey/AddSurvey"
import Questions from './pages/Question/Questions';
function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signin" element={<Signup/>} />
        <Route path="/AdminDahsboard" element={<AdminDashboard/>}/>
        <Route path="/addsurvey" element={<AddSurvey/>}/>
        <Route path="/Questions" element={<Questions/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
