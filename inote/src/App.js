import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/Notestate";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./component/Alert";
import Signup from "./component/Signup";
import Login from "./component/Login";
import {useState} from 'react'
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (massage, type) => {
    setAlert({
      msg: massage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/about" element={<About  showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
