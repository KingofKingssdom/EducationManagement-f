import './Admin.css';
import axios from 'axios';
import { useState } from 'react';
import Sidebar from './SideBar';


function AddSubject() {
    const [subjectId, setSubjectId] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if ( !subjectId || !subjectName) {
            setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }

    
        const formData = new FormData(); 
        formData.append("subjectId", subjectId);
        formData.append("subjectName", subjectName);

        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('http://localhost:8080/subject/add', formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization' : `Bearer ${token}`
                },
            });
            if (response.status === 200 || response.status === 201) {
                 setMessage("Thêm môn học thành công!");
                // Reset form
                setSubjectId("");
                setSubjectName("");
            } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        }
    };

    return (
        <div className='container-admin'>
            <Sidebar/>
            <div className="content">
            {message && <p className="notification-success">{message}</p>}
            {errorMessage && <p className="notification-error">{errorMessage}</p>}
            <div className="header-add">
                <h1>Thêm môn học</h1>
            </div>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="IdAdmin">Mã môn học:</label>
                        <input 
                            placeholder='2 chữ cái đầu tên môn học + 10/11/12'
                            type="text" 
                            id="subjectId" 
                            name="subjectId" 
                            value={subjectId} 
                            onChange={(e) => setSubjectId(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="subjectName">Tên môn học:</label>
                        <input 
                            type="text" 
                            id="subjectName" 
                            name="subjectName" 
                            value={subjectName} 
                            onChange={(e) => setSubjectName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button className='button-add' type="submit">Thêm</button>
                </form>
            </div>
        </div>
        </div>
        
    );
}

export default AddSubject;

