import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';
import Home from './components/Home';
import MovieScreenings from './components/MovieScreenings';
import ComingSoon from './components/ComingSoon';
import NotFound from './components/NotFound';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { UserContextProvider } from './context/UserContext';
import MyBookings from './components/MyBookings';
import ScreeningPassedModal from './modals/ScreeningPassedModal';
import Users from './components/Users';
import AddMovie from './components/AddMovie';
import Screenings from './components/Screenings';


function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/movies" element={<MovieScreenings />} />

              <Route exact path="/movies/:id" element={<MovieDetails />} />

              <Route exact path="/coming-soon" element={<ComingSoon />} />

              <Route exact path="/login" element={<LogIn />} />

              <Route exact path="/signup" element={<SignUp />} />

              <Route exact path="/screening-passed-modal" element={<ScreeningPassedModal />} />

              <Route exact path="/my-bookings" element={<MyBookings />} />

              <Route exact path="/users" element={<Users />} />

              <Route exact path="/add-movie" element={<AddMovie />} />

              <Route exact path="/screenings" element={<Screenings />} />

              <Route path='/movies/*' element={<NotFound />} />

              <Route path='/*' element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
