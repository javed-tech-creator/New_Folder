
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer, toast } from 'react-toastify';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EmployeeList from './pages/EmployeeList';
import EditEmployee from './pages/EditEmployee';

function App() {

  return (
    <BrowserRouter>
        <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/employee/add' element={<AddEmployee />} />
          <Route path='/employee/list' element={<EmployeeList />} />
          <Route path="/employee/edit/:id" element={<EditEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
