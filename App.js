import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckIn from "./pages/CheckIn";
import HotelList from "./pages/HotelList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/book-hotel/:id" element={<HotelList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-in/:hotelId" element={<CheckIn />} />
      </Routes>
    </Router>
  );
}

export default App;
