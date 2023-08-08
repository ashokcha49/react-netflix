import { Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthContextProvider } from './context/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import ProtoctedRoute from './components/ProtoctedRoute';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/account" element={<ProtoctedRoute><Account /></ProtoctedRoute>}></Route>
      </Routes>
      </AuthContextProvider>

      </div>
  );
}

export default App;
