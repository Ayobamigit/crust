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
import AddRoute from './pages/Routing/AddRoute';
import Routing from './pages/Routing/Routing';
import ViewRoute from './pages/Routing/ViewRoute';
import Schemes from './pages/Schemes/Schemes';
import Signin from './pages/Signin/Signin';
import Stations from './pages/Stations/Stations';
import Terminals from './pages/Terminals/Terminals';
import Transaction from './pages/Transactions/Transaction';
import Transactions from './pages/Transactions/Transactions';
import AddUser from './pages/Users/AddUser';
import ViewUser from './pages/Users/ViewUser';
import ViewUsers from './pages/Users/ViewUsers';

const PrivateRoute = ({ children}) => {
  return localStorage.getItem('userDetails') ? children : <Navigate to="/sign-in" />
}

function App() {
  return (
    <Suspense fallback="f">
      <Routes>
        <Route path='/' exact element={ <PrivateRoute><Dashboard /> </PrivateRoute> }/>

        {/* Login */}
        <Route path='/sign-in' exact element={<Signin />} />

        {/* Dashboard Management */}

        <Route path='/dashboard' exact element={<PrivateRoute><Dashboard /> </PrivateRoute>} />

        {/* Transaction management */}
        <Route path='/transactions' exact element={<PrivateRoute><Transactions /> </PrivateRoute>} />
        <Route path='/transaction/:id' exact element={<PrivateRoute><Transaction /> </PrivateRoute>} />


        {/* User Management */}
        <Route path='/users' exact element={ <PrivateRoute><ViewUsers /></PrivateRoute>} />
        <Route path='/add-user' exact element={ <PrivateRoute><AddUser /></PrivateRoute>} />
        <Route path='/user/:id' exact element={ <PrivateRoute><ViewUser /></PrivateRoute>} />

        {/* Merchant Management */}

        <Route path='/merchants' exact element={ <PrivateRoute><ViewMerchants /></PrivateRoute>} />
        <Route path='/merchant/:id' exact element={ <PrivateRoute><ViewMerchant /></PrivateRoute>} />
        <Route path='/add-merchant' exact element={ <PrivateRoute><AddMerchant /></PrivateRoute>} />

        {/* Client Management */}
        <Route path='/clients' exact element={ <PrivateRoute><ViewClients/></PrivateRoute>} />
        <Route path='/client/:id' exact element={ <PrivateRoute><ViewClient/></PrivateRoute>} />
        <Route path='/add-client' exact element={ <PrivateRoute><AddClient/></PrivateRoute>} />

        {/* Terminal Management */}
        <Route path='/terminals' exact element={ <PrivateRoute><Terminals/></PrivateRoute>} />

        {/* Role Management */}
        <Route path='/roles' exact element={ <PrivateRoute><Roles/></PrivateRoute>} />

        {/* Scheme Management */}
        <Route path='/schemes' exact element={ <PrivateRoute><Schemes/></PrivateRoute>} />

        {/* Routes Management */}
        <Route path='/routes' exact element={ <PrivateRoute><Routing/></PrivateRoute>} />
        <Route path='/route/:id' exact element={ <PrivateRoute><ViewRoute/></PrivateRoute>} />
        <Route path='/add-route' exact element={ <PrivateRoute><AddRoute/></PrivateRoute>} />

        {/* Station Management */}
        <Route path='/stations' exact element={ <PrivateRoute><Stations/></PrivateRoute>} />

      </Routes>
    </Suspense>
  );
}

export default App;
