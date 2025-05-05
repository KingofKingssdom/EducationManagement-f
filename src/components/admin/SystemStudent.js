import "./Admin.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";

function SystemStudent() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [idStudentFilter, setIdStudentFilter] = useState("");

    useEffect(() => {

        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/student/getAll');
                const data = Array.isArray(response.data) ? response.data : [];
                setStudents(data);
                setFilteredStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setFilteredStudents([]); // Đảm bảo filteredStudents là mảng rỗng nếu có lỗi
            }
        };

        fetchStudents();
    }, []);

    const handleFilter = async () => {
        if (idStudentFilter.trim() === "") {
            setFilteredStudents(students);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/student/getId/${idStudentFilter}`);
            if (response.data) {
                setFilteredStudents([response.data]);
            } else {
                setFilteredStudents([]);
            }

        } catch (error) {
            console.error("Error filtering:", error);
            setFilteredStudents([]);
            alert("Không tìm thấy học sinh với mã này.");
        }
    };

    return (
        <>
        <div className="container-admin">
            <Sidebar/>
            <div className="content">

                <h1>Tài khoản học sinh</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Nhập mã học sinh..."
                        value={idStudentFilter}
                        onChange={(e) => setIdStudentFilter(e.target.value)}
                    />
                    <button onClick={handleFilter}>Lọc</button>
                </div>
                <div className="limited">
                    <table className="table table-light table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã học sinh</th>
                                <th>Lớp học</th>
                                <th className="fullName-table">Họ và tên</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th className="address-table">Địa chỉ</th>
                                <th className="repair-table">Chỉnh sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(filteredStudents) && filteredStudents.map((student, index) => (
                                <tr key={student.id || index}>
                                    <td>{student.id}</td>
                                    <td>{student.idStudent}</td>
                                    <td>{student.classroom}</td>
                                    <td>{student.fullName}</td>
                                    <td>{student.birth}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.address}</td>
                                    <td>
                                        <Link to={`/updateStudent/${student.id}`}>
                                            <button className="btn btn-update">Cập nhật</button>
                                        </Link>
                                        {' - '}
                                        <button className="btn btn-delete">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
            

        </>
    )
}

export default SystemStudent;