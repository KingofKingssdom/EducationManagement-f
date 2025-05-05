import "./Admin.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";

function ListTeacher () {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [idTeacherFilter, setIdTeacherFilter] = useState("");
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/teacher/getAll',{
                    headers : {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTeachers(response.data);
                setFilteredTeachers(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchTeachers();
    }, []);
    const handleFilter = async () => {
        if (idTeacherFilter.trim() === "") {
            setFilteredTeachers(teachers);
            return;
        }

        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`http://localhost:8080/teacher/getId/${idTeacherFilter}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.data){
                setFilteredTeachers([response.data]);
            }
            else{
                setFilteredTeachers([]);
            }

        } catch (error) {
            console.error("Error filtering:", error);
            setFilteredTeachers([]);
            alert("Không tìm thấy giáo viên với mã này.");
        }
    };
    return(
        <>
        <div className="container-admin">
            <Sidebar/>
        <div className="content">
            <h1>Tài khoản giáo viên</h1>
            <div>
                    <input
                        type="text"
                        placeholder="Nhập mã giáo viên..."
                        value={idTeacherFilter}
                        onChange={(e) => setIdTeacherFilter(e.target.value)}
                    />
                    <button onClick={handleFilter}>Lọc</button>
                </div>
            <div className="limited">
            <table class="table table-light table-striped table-bordered table-hover">
            <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã giáo viên</th>
                            <th>Môn dạy</th>
                            <th>Lớp</th>
                            <th className="fullName-table">Họ và tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th className="address-table">Địa chỉ</th>
                            <th className="repair-table">Xem chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredTeachers.map((teacher, index) => (
                                <tr key={teacher.id || index}>
                                    <td>{teacher.id}</td>
                                    <td>{teacher.idTeacher}</td>
                                    <td>{teacher.subject}</td>
                                    <td>{teacher.classroom}</td>
                                    <td>{teacher.fullName}</td>
                                    <td>{teacher.birthDay}</td>
                                    <td>{teacher.gender}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.address}</td>
                                    <td>
                                        <Link to={`/detailTeacher/${teacher.id}`}>
                                            <button className="btn btn-warning">Chi tiết</button>
                                        </Link>
                                        
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
export default ListTeacher;