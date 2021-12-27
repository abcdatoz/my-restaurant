import './App.css';

import Header from  './components/layouts/Header'


import PrivateRoute from './components/common/PrivateRoute'
import Login from './components/accounts/Login'
import Register from './components/accounts/Register'

import Home from './components/Home'
import Hello from './components/Hello'
import LaCarta from './components/LaCarta'


import { Route, Routes, } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      


      <div className='container'>
        <Routes>
          <Route exact path="/" element={ <Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/holo" element={<PrivateRoute> <Hello />  </PrivateRoute>  }  />

          <Route exact path="/laCarta" element={<LaCarta />} />

        </Routes>

      </div>
      

    </div>
  );
}
export default App;
