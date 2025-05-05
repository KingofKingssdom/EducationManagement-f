import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Correct import
import Home from './components/admin/Home';
import AddStudent from "./components/admin/AddStudent";
import AddTeacher from "./components/admin/AddTeacher";
import AddAdmin from "./components/admin/AddAdmin";
import SystemStudent from "./components/admin/SystemStudent";
import SystemTeacher from "./components/admin/SystemTeacher";
import SystemAdmin from "./components/admin/SystemAdmin";
import UpdateTeacher from "./components/admin/UpdateTeacher";
import UpdateStudent from "./components/admin/UpdateStudent";
import UpdateAdmin from "./components/admin/UpdateAdmin";
import ListClass from "./components/admin/ListClass";
import DetailStudent from "./components/admin/DetailStudent";
import MarkTable from "./components/admin/MarkTable";
import AddSemester from "./components/admin/AddSemester";
import AddSubject from "./components/admin/AddSubject";
import ViewSubject from "./components/admin/ViewSubject";
import ViewSemester from "./components/admin/ViewSemester";
import DetailTeacher from "./components/admin/DetailTeacher";
import ListTeacher from "./components/admin/ListTeacher";
import AddMark from './components/admin/AddMark';
function App() {
  return (
    <BrowserRouter> {/* BrowserRouter wraps everything */}
      <div className="container-admin">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/addTeacher" element={<AddTeacher />} />
          <Route path="/systemStudent" element={<SystemStudent />} />
          <Route path="/systemTeacher" element={<SystemTeacher />} />
          <Route path="/systemAdmin" element={<SystemAdmin />} />
          <Route path="/updateTeacher/:id" element={<UpdateTeacher />} />
          <Route path="/updateStudent/:id" element={<UpdateStudent />} />
          <Route path="/updateAdmin/:id" element={<UpdateAdmin />} />
          <Route path="/listClass" element={<ListClass />} />
          <Route path="/detailStudent/:id" element={<DetailStudent />} />
          <Route path="/subjectTable" element={<MarkTable />} />
          <Route path="/addSemester" element={<AddSemester />} />
          <Route path="/addSubject" element={<AddSubject />} />
          <Route path="/viewSubject" element={<ViewSubject />} />
          <Route path="/viewSemester" element={<ViewSemester />} />
          <Route path="/detailTeacher/:id" element={<DetailTeacher />} />
          <Route path="/listTeacher" element={<ListTeacher />} />
          <Route path="/addMark" element={<AddMark/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
