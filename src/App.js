import { Suspense } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import './App.scss';
import AddClient from './pages/Clients/AddClient';
import ViewClient from './pages/Clients/ViewClient';
import ViewClients from './pages/Clients/ViewClients';
import Dashboard from './pages/Dashboard/Dashboard';
import AddMerchant from './pages/Merchants/AddMerchant';
import ViewMerchant from './pages/Merchants/ViewMerchant';
import ViewMerchants from './pages/Merchants/ViewMerchants';
import Roles from './pages/Roles/Roles';
import Routing from './pages/Routing/Routing';
import Schemes from './pages/Schemes/Schemes';
import Signin from './pages/Signin/Signin';
import Stations from './pages/Stations/Stations';
import Terminals from './pages/Terminals/Terminals';
import AddUser from './pages/Users/AddUser';
import ViewUser from './pages/Users/ViewUser';
import ViewUsers from './pages/Users/ViewUsers';

// const PrivateRoute = ({ children}) => {
//   return localStorage.getItem('userDetails') ? children : <Navigate to="/sign-in" />
// }

function App() {
  return (
    <Suspense fallback="f">
      <Routes>
        {/* <Route path='/' exact element={ <PrivateRoute><Dashboard /> </PrivateRoute> }/> */}

        {/* Login */}
        <Route path='/sign-in' exact element={<Signin />} />

        {/* Dashboard Management */}

        <Route path='/dashboard' exact element={ <Dashboard />} />

        {/* User Management */}
        <Route path='/users' exact element={ <ViewUsers />} />
        <Route path='/add-user' exact element={ <AddUser />} />
        <Route path='/user/:id' exact element={ <ViewUser />} />

        {/* Merchant Management */}

        <Route path='/merchants' exact element={ <ViewMerchants />} />
        <Route path='/merchant/:id' exact element={ <ViewMerchant />} />
        <Route path='/add-merchant' exact element={ <AddMerchant />} />

        {/* Client Management */}
        <Route path='/clients' exact element={ <ViewClients/>} />
        <Route path='/client/:id' exact element={ <ViewClient/>} />
        <Route path='/add-client' exact element={ <AddClient/>} />

        {/* Terminal Management */}
        <Route path='/terminals' exact element={ <Terminals/>} />

        {/* Role Management */}
        <Route path='/roles' exact element={ <Roles/>} />

        {/* Scheme Management */}
        <Route path='/schemes' exact element={ <Schemes/>} />

        {/* Routes Management */}
        <Route path='/routes' exact element={ <Routing/>} />

        {/* Station Management */}
        <Route path='/stations' exact element={ <Stations/>} />

      </Routes>
    </Suspense>
  );
}

export default App;
