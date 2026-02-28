import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Form from './components/Form';
import SignUp from './components/SignUp';
import { AdminDashboard } from './components/AdminDashboard';
import { AttendanceDashboard } from './components/AttendanceDashboard';
import { CorrectionDashboard } from './components/CorrectionDashboard';
import { DisputeDashboard } from './components/DisputeDashboard';
import { DeviceDashboard } from './components/DeviceDashboard';
import { WorkshiftDashboard } from './components/WorkshiftDashboard';
import { PolicyDashboard } from './components/PolicyDashboard';



const App : React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Form />}/>
      <Route path='/sign_up' element={<SignUp/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/attendance/list' element={<AttendanceDashboard/>}/>
      <Route path='/correction/list' element={<CorrectionDashboard/>}/>
      <Route path='/dispute/list' element={<DisputeDashboard/>}/>
      <Route path='/device/list' element={<DeviceDashboard/>}/>
      <Route path='/workshift/list' element={<WorkshiftDashboard/>}/>
      <Route path='/policy/list' element={<PolicyDashboard/>}/>
    </Routes>
  </Router>
);

export default App;
