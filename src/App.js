import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import PostCard from './components/PostCard/PostCard';

import {Routes,BrowserRouter as Router,Route} from 'react-router-dom'

import configureStore from './store/store'

function App() {
  return (
    <div className="App">
      {/* <PostCard /> */}

      <Router>
        <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/users/:userID' element={<Profile/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
