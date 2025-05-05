import "./Admin.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";

function ViewSemester() {
    const [semester, setSemester] = useState([]);
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
    return (
        <>
        <div className="container-admin">
            <Sidebar/>
            <div className="content">

                <h1>Danh sách học kì</h1>
                <div className="limited">
                    <table className="table table-light table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên học kì</th>
                                <th>Niên khóa</th>
                                <th className="repair-table">Chỉnh sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {semester.map((semester, index) => (
                                <tr key={semester.id || index}>
                                    <td>{semester.id}</td>
                                    <td>{semester.semesterName}</td>
                                    <td>{semester.year}</td>
                                    <td>
                                        <Link to={`/updateStudent/${semester.id}`}>
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

export default ViewSemester;