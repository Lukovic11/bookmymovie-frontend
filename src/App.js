import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';
import Home from './components/Home';
import MovieScreenings from './components/MovieScreenings';
import ComingSoon from './components/ComingSoon';
import NotFound from './components/NotFound';
import SignUp from './components/SignUp';


function App() {
  return (
    <Router>
      <div className="App" >
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/movies">
              <MovieScreenings/>
            </Route>
            <Route exact path="/movies/:id" component={MovieDetails}/>
            <Route exact path="/coming-soon">
              <ComingSoon />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route path='/movies/*'>
              <NotFound/>
            </Route>
            <Route path='/*'>
              <NotFound/>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
