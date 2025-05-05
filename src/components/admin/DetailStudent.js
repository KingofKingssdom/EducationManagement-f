import "./Admin.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import Sidebar from "./Sidebar";


function DetailStudent() {
    const { id } = useParams(); // Lấy id từ URL
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
    
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/student/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student details:', error);
                setError(error);
                setLoading(false);
            }
        };

        // Chỉ gọi API khi id thay đổi
        if (id) {
            fetchStudentDetails();
        }
    }, [id]); 


    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Có lỗi xảy ra: {error.message}</div>;

    return(
        <>
        <div className="container-admin">
            <Sidebar/>
        <div className="content">
            <div className="header">
                <h2>Thông tin chi tiết học sinh</h2>
            </div>
            {student && (
                <div className="DetailStudent-container">
                    <img 
                        alt="Thông tin chi tiết học sinh"  
                        src={`data:image/jpeg;base64,${student.avatar}`}
                    />
                    <div className="DetailStudent-content">
                        <p><span>Tên lớp:</span> {student.classroom || 'Chưa xác định'}</p>
                        <p><span>Mã học sinh:</span> {student.idStudent || 'Chưa xác định'}</p>
                        <p><span>Họ và tên:</span> {student.fullName || 'Chưa xác định'}</p>
                        <p><span>Ngày sinh:</span> {student.birth || 'Chưa xác định'}</p>
                        <p><span>Giới tính:</span> {student.gender || 'Chưa xác định'}</p>
                        <p><span>Email:</span> {student.email || 'Chưa xác định'}</p> 
                        <p><span>Số điện thoại:</span> {student.phone || 'Chưa xác định'}</p> 
                        <p><span>Ngày vào trường:</span> {student.studyDay || 'Chưa xác định'}</p>
                        <p><span>Địa chỉ:</span> {student.address || 'Chưa xác định'}</p>
                    </div>
                </div>
            )}
        </div>
        </div>
        
        </>
    )
}

export default DetailStudent;