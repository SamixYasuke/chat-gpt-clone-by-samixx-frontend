import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home"; // Change the import to Home
import Conversation from "./Pages/Conversation";
import NotFound from "./Pages/NotFound";
import { useState } from "react";

const App = () => {
  const toggleMobileNav = () => {
    setMobileNavIsShown(!mobileNavIsShown);
  }; 
  const [mobileNavIsShown, setMobileNavIsShown] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home toggleMobileNav={toggleMobileNav} mobileNavIsShown={mobileNavIsShown} setMobileNavIsShown={setMobileNavIsShown} />} />
        <Route
          path="/chat/:userId/:conversationId"
          element={<Conversation toggleMobileNav={toggleMobileNav} mobileNavIsShown={mobileNavIsShown} setMobileNavIsShown={setMobileNavIsShown} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
