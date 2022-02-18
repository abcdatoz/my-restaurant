import './App.css';


import PrivateRoute from './components/common/PrivateRoute'
import Login from './components/accounts/Login'
import Register from './components/accounts/Register'


import Home from './components/Home'
import LaCarta from './components/LaCarta'

import HomeAdministracion from './components/HomeAdministracion'
import Categorias from './components/Categorias'
import Productos from './components/Productos'

import Mesas from './components/Mesas'
import Meseros from './components/Meseros'

import Servicio from './components/Servicio';




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
          
          <Route exact path="/Administracion" element={ <HomeAdministracion />} />          
          <Route exact path="/Restaurantes" element={<PrivateRoute> <HomeAdministracion />  </PrivateRoute>  }  />
          <Route exact path="/Categorias" element={<PrivateRoute> <Categorias />  </PrivateRoute>  }  />
          <Route exact path="/Productos" element={<PrivateRoute> <Productos />  </PrivateRoute>  }  />
          <Route exact path="/Mesas" element={<PrivateRoute> <Mesas />  </PrivateRoute>  }  />
          <Route exact path="/Meseros" element={<PrivateRoute> <Meseros />  </PrivateRoute>  }  />

          

          <Route exact path="/laCarta" element={<LaCarta />} />
          <Route exact path="/servicio" element={<Servicio />} />


          

        </Routes>

      </div>
      

    </div>
  );
}
export default App;
