import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddMark() {
    const [students, setStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [markData, setMarkData] = useState({
        fifteenMinutes: '',
        fortyFiveMinutes: '',
        semesterMark: '',
        studentId: '',
        semesterId: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

       
        axios.get('http://localhost:8080/student/getAll', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
           
            setStudents(response.data);
        }).catch(error => {
            console.error('Có lỗi xảy ra khi lấy học sinh:', error);
        });

       
        axios.get('http://localhost:8080/semester/getAll', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            
            setSemesters(response.data);
        }).catch(error => {
            console.error('Có lỗi xảy ra khi lấy học kỳ:', error);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMarkData({ ...markData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
    
        if (!token) {
            alert('Bạn cần đăng nhập trước.');
            return;
        }
    
        
        const dataToSend = {
            fifteenMinutes: markData.fifteenMinutes,
            fortyFiveMinutes: markData.fortyFiveMinutes,
            semesterMark: markData.semesterMark,
            studentId: parseInt(markData.studentId), 
            semesterId: parseInt(markData.semesterId)  
        };
    
       
        axios.post('http://localhost:8080/mark/add', dataToSend, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert('Điểm đã được thêm thành công!');
            // Reset form 
            setMarkData({
                fifteenMinutes: '',
                fortyFiveMinutes: '',
                semesterMark: '',
                studentId: '',
                semesterId: ''
            });
        })
        .catch(error => {
            console.error('Có lỗi xảy ra khi thêm điểm:', error);
            if (error.response && error.response.status === 401) {
                alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
               
            } else if (error.response && error.response.status === 404) {
                alert(error.response.data); 
            } else {
                alert('Có lỗi xảy ra khi thêm điểm.');
            }
        });
    };

    return (
        <div>
            <h1>Thêm điểm ở đây</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Học sinh:</label>
                    <select name="studentId" onChange={handleChange} required>
                        <option value="">Chọn học sinh</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.fullName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Học kỳ:</label>
                    <select name="semesterId" onChange={handleChange} required>
                        <option value="">Chọn học kỳ</option>
                        {semesters.map(semester => (
                            <option key={semester.id} value={semester.id}>{semester.semesterName} {semester.year}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Điểm kiểm tra 15 phút:</label>
                    <input type="number" name="fifteenMinutes" value={markData.fifteenMinutes} onChange={handleChange} required />
                </div>
                <div>
                    <label>Điểm kiểm tra 45 phút:</label>
                    <input type="number" name="fortyFiveMinutes" value={markData.fortyFiveMinutes} onChange={handleChange} required />
                </div>
                <div>
                    <label>Điểm học kỳ:</label>
                    <input type="number" name="semesterMark" value={markData.semesterMark} onChange={handleChange} required />
                </div>
                <button type="submit">Thêm điểm</button>
            </form>
        </div>
    );
}

export default AddMark;