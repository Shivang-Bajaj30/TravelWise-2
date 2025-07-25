import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home  from './pages/Home';
import Destinations  from './pages/Destinations';
import Packages from './pages/Packages';

const App = () => (
  <div className="relative bg-gray-50 min-h-screen">
    <Navbar />
    <div className="pt-16 sm:pt-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </div>
  </div>
);

export default App;