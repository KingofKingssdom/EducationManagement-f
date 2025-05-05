import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function MarkTable() {
  const [marks, setMarks] = useState([]);
  const [selectedClass, setSelectedClass] = useState("10A1");
  const [selectedSubject, setSelectedSubject] = useState("Ngữ văn 10");
  const [selectedSemesterName, setSelectedSemesterName] = useState("HKI");
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [subject, setSubject] = useState([]);
  const [semester, setSemester] = useState([]);
  const handleFilter = () => {
    axios
      .get("http://localhost:8080/mark/student/filter", {
        params: {
          classroom: selectedClass,
          subjectName: selectedSubject,
          semesterName: selectedSemesterName,
          year: selectedYear
        },
      })
      .then((response) => {
        setMarks(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
      });
  };
  // call api lấy ra danh sách môn học
  useEffect(() => {
      // Hàm fetch data sử dụng axios
      const fetchSubjects = async () => {
          try {
              const token = localStorage.getItem('token')
              const response = await axios.get('http://localhost:8080/subject/getAll',{
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });

              const data = Array.isArray(response.data) ? response.data : [];
              setSubject(data);
          } catch (error) {
              console.error('Error fetching students:', error);
          }
      };

      fetchSubjects();
  }, []);
  // call api niên khóa 
    useEffect(() => {
        // Hàm fetch data sử dụng axios
        const fetchSemesters = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/semester/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSemester(response.data);
            } catch (error) {
                console.error('Error fetching semester:', error);
            }
        };

        fetchSemesters();
    }, []);
    // call api danh sách học sinh
    
  return (
    <div className="container-admin">
      <Sidebar/>
      <div className="content">
      <div className="filter">
        
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>         
          <option value="10A1">10A1</option>
          <option value="10A2">10A2</option>
          <option value="10A3">10A3</option>
          <option value="10A4">10A4</option>
          <option value="10A5">10A5</option>
          <option value="10A6">10A6</option>
          <option value="10A7">10A7</option>
          <option value="10A8">10A8</option>
          <option value="10A9">10A9</option>
        </select>

        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
        {subject.map((sub) => (
          <option key={sub.id} value={sub.subjectName}>
        {sub.subjectName}
    </option>
  ))}
        </select>

        <select value={selectedSemesterName} onChange={(e) => setSelectedSemesterName(e.target.value)}>
          <option value="HKI">HKI</option>
          <option value="HKII">HKII</option>
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        {semester.map((sem) => (
          <option key={sem.id} value={sem.year}>
        {sem.year}
    </option>))}
        </select>

        <button className="btn btn-success" onClick={handleFilter}>
          Xem kết quả
        </button>
      </div>

      <div className="limited">
        <table className="table table-light table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã học sinh</th>
              <th>Họ Tên</th>
              <th>Điểm 15'</th>
              <th>Điểm 1 tiết</th>
              <th>Điểm HK</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item[2]}</td> {/* fullName */}
                <td>{item[0]}</td> {/* fifteenMinutes */}
                <td>{item[3]}</td> {/* fortyFiveMinutes */}
                <td>{item[4]}</td> {/* semesterMark */}
                <td>{item[5]}</td> {/* semesterMark */}
                <td><Link to="/"><button className="btn btn-warning">Cập nhập</button></Link>  - <button className="btn btn-danger">Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
}

export default MarkTable;