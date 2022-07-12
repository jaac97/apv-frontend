
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ConfirmAccount from './views/ConfirmAccount';
import Login from './views/Login';
import NewPassword from './views/NewPassword';
import RecoveryPassword from './views/RecoveryPassword';
import Register from './views/Register';

import PrivateRoute from './layout/PrivateRoute';
import AdminPatients from './views/AdminPatients';

import {AuthProvider} from './context/AuthProvider';
import { PatientsProviders } from './context/PatientsProvider';

import UpdateProfile from './views/UpdateProfile';
import ChangePassword from './views/ChangePassword';



function App() {
  return(

    <BrowserRouter>
      <AuthProvider>
        <PatientsProviders>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path='login' element={<Login />} />
                  <Route path='register' element={<Register />} />
                  <Route path='confirm/:id' element={<ConfirmAccount />} />
                  <Route path='recovery-password' element={<RecoveryPassword />} />
                  <Route path='recovery-password/:token' element={<NewPassword />} />
              </Route>
              <Route path='/admin' element={<PrivateRoute />}>
                  <Route index element={<AdminPatients />} />
                  <Route path='profile' element={<UpdateProfile />} />
                  <Route path='change-password' element={<ChangePassword />} />
              </Route>
            </Routes>
            </PatientsProviders>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
