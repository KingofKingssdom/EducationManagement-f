import "./Admin.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";

function ViewSubject() {
    const [subject, setSubject] = useState([]);
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
    return (
        <>
        <div className="container-admin">
            <Sidebar/>
            <div className="content">

<h1>Danh sách môn học</h1>
<div className="limited">
    <table className="table table-light table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã môn học</th>
                <th>Tên môn học</th>
                <th className="repair-table">Chỉnh sửa</th>
            </tr>
        </thead>
        <tbody>
            {subject.map((subject, index) => (
                <tr key={subject.id || index}>
                    <td>{subject.id}</td>
                    <td>{subject.subjectId}</td>
                    <td>{subject.subjectName}</td>
                    <td>
                        <Link to={`/updateStudent/${subject.id}`}>
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

export default ViewSubject;