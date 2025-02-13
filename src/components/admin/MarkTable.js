import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";

function MarkTable() {
  const [marks, setMarks] = useState([]);
  const [selectedClass, setSelectedClass] = useState("10A1");
  const [selectedSubject, setSelectedSubject] = useState("Ngữ văn 10");
  const [selectedSemesterName, setSelectedSemesterName] = useState("HKI");
  const [selectedYear, setSelectedYear] = useState("2024-2025");

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

  return (
    <div className="container-admin">
      <Sidebar/>
      <div className="content">
      <div className="filter">

        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="10A1">10A1</option>
          <option value="10A2">10A2</option>
          <option value="10A3">10A3</option>
        </select>

        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="Toán 10">Toán 10</option>
          <option value="Ngữ văn 10">Ngữ văn 10</option>
          <option value="Tiếng anh 10">Tiếng anh 10</option>
        </select>

        <select value={selectedSemesterName} onChange={(e) => setSelectedSemesterName(e.target.value)}>
          <option value="HKI">HKI</option>
          <option value="HKII">HKII</option>
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
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