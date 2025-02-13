import "./Admin.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import Sidebar from "./SideBar";


function DetailTeacher() {
    const { id } = useParams(); // Lấy id từ URL
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                // Sử dụng id động từ URL
                const response = await axios.get(`http://localhost:8080/teacher/${id}`);
                setTeacher(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teacher details:', error);
                setError(error);
                setLoading(false);
            }
        };

        // Chỉ gọi API khi id thay đổi
        if (id) {
            fetchTeacherDetails();
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
                <h2>Thông tin chi tiết giáo viên</h2>
            </div>
            {teacher && (
                <div className="DetailStudent-container">
                    <img 
                        alt="Thông tin chi tiết giáo viên"  
                        src={`data:image/jpeg;base64,${teacher.avatar}`}
                    />
                    <div className="DetailStudent-content">
                        <p><span>Lớp chủ nhiệm:</span> {teacher.classroom || 'Chưa xác định'}</p>
                        <p><span>Mã giáo viên:</span> {teacher.idTeacher || 'Chưa xác định'}</p>
                        <p><span>Họ và tên:</span> {teacher.fullName || 'Chưa xác định'}</p>
                        <p><span>Ngày sinh:</span> {teacher.birthDay || 'Chưa xác định'}</p>
                        <p><span>Giới tính:</span> {teacher.gender || 'Chưa xác định'}</p>
                        <p><span>Email:</span> {teacher.email || 'Chưa xác định'}</p> 
                        <p><span>Ngày vào làm:</span> {teacher.workDay || 'Chưa xác định'}</p>
                        <p><span>Địa chỉ:</span> {teacher.address || 'Chưa xác định'}</p>
                    </div>
                </div>
            )}
        </div>
        </div>
        
        </>
    )
}

export default DetailTeacher;