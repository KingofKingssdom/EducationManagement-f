import "./Admin.css"
import {  useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";

function ListClass(){
    const [selectedClass, setSelectedClass] = useState("10A1"); 
    const [students, setStudents] = useState([]);
    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`http://localhost:8080/student/getClassroom/${selectedClass}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStudents(response.data); 
        } catch (error) {
            console.error("Lỗi khi lấy danh sách học sinh:", error);
        }
    };
    return(
        <>
        <div className="container-admin">
            <Sidebar/>
        <div className="content">
        <h1>Danh sách lớp</h1>
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
            </select>
            <button onClick={fetchStudents}>Tìm kết quả</button>
        </div>
        <div className="limited">
            <table class="table table-light table-striped table-bordered table-hover">
            <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã học sinh</th>
                            <th>Họ và tên</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.idStudent}</td>
                                        <td>{student.fullName}</td>
                                        <td> <Link to={`/detailStudent/${student.id}`}><button className="btn btn-warning">Xem chi tiết</button> </Link> </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9">
                                        Chọn và bấm tìm kết quả 
                                    </td>
                                </tr>
                            )}

                    </tbody>
        </table>
            </div>
        </div>
        </div>
        
        </>
    )
}
export default ListClass;