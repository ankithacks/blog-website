import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/home/single/Single";
import Write from "./pages/home/write/Write";
import Settings from "./pages/home/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import{
  BrowserRouter as Router,
  Route,
  Routes,
  // Link,
  // Navigate
} from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {
  const {user}= useContext(Context);
  // const user=false;
  // if this user is assigned true that means we are loggd i and false is we are not
  return (
    // {/* // <> */}
    // {/* // <div className="App">
    // //   blog app starting
    // // </div>  note that <></> enclosde inside makes the react component come ito existance */}   
    //   <TopBar/>
    //   {/* <Home />

    //   <Single />
    //   <Write />
    //   <Settings />
    //   <Login /> */}
    //   <Register/>
    // {/* // </> */}
    // // </Router>
  

    <Router>
      <TopBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={user? <Home/> : <Register />} />
        <Route path="/Login" element={user? <Home /> : <Login />} /> 
        
        <Route path="/write" element={user? <Write/>: <Register /> } />
        <Route path="/settings" element={user? <Settings />: <Register/>} />
        <Route path="/post/:postId" element={<Single />} />


      </Routes>
    </Router>
  );
}

export default App;
