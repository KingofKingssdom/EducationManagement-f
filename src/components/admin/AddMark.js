import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
function AddMark() {
    const [students, setStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [subject, setSubject] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [markData, setMarkData] = useState({
        fifteenMinutes: '',
        fortyFiveMinutes: '',
        semesterMark: '',
        studentId: '',
        semesterId: '',
        subjectId:''
    });

    useEffect(() => {
        // const token = localStorage.getItem('token');

       
        axios.get('http://localhost:8080/student/getAll', {
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        }).then(response => {
           
            setStudents(response.data);
        }).catch(error => {
            console.error('Có lỗi xảy ra khi lấy học sinh:', error);
        });

       
        axios.get('http://localhost:8080/semester/getAll', {
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
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
        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");
        // const token = localStorage.getItem('token');
    
        // if (!token) {
        //     alert('Bạn cần đăng nhập trước.');
        //     return;
        // }
    
        
        const dataToSend = {
            fifteenMinutes: markData.fifteenMinutes,
            fortyFiveMinutes: markData.fortyFiveMinutes,
            semesterMark: markData.semesterMark,
            studentId: parseInt(markData.studentId), 
            semesterId: parseInt(markData.semesterId),
            subjectId: parseInt(markData.subjectId)  
        };
    
       
        axios.post('http://localhost:8080/mark/add', dataToSend, {
            // headers: {
            //     'Authorization': `Bearer ${token}`,
            //     'Content-Type': 'application/json'
            // }
        })
        .then(response => {
            setMessage("Thêm điểm thành công!");
            // Reset form 
            setMarkData({
                fifteenMinutes: '',
                fortyFiveMinutes: '',
                semesterMark: '',
                studentId: '',
                semesterId: '',
                subjectId:''
            });
        })
        .catch(error => {
            setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            // if (error.response && error.response.status === 401) {
            //     alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
               
            // } else if (error.response && error.response.status === 404) {
            //     alert(error.response.data); 
            // } else {
            //     alert('Có lỗi xảy ra khi thêm điểm.');
            // }
        });
    };
    // call api lấy ra danh sách môn học
  useEffect(() => {
    // Hàm fetch data sử dụng axios
    const fetchSubjects = async () => {
        try {
            // const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:8080/subject/getAll',{
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
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
        <div className='container-admin'>
             <Sidebar/>
             <div className="content">
             {message && <p className="notification-success">{message}</p>}
             {errorMessage && <p className="notification-error">{errorMessage}</p>}
             <div className="header-add">
                <h1>Nhập điểm học sinh</h1>
            </div>
            <div className="form-container">
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
                    <label>Môn học:</label>
                    <select name="subjectId" onChange={handleChange} required>
                        <option value="">Chọn môn học</option>
                        {subject.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.subjectName}</option>
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
                <button className='button-add' type="submit">Thêm</button>
            </form>
            </div>
             </div>
            
        </div>
    );
}

export default AddMark;