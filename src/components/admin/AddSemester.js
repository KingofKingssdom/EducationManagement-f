import './Admin.css';
import axios from 'axios';
import { useState } from 'react';
import Sidebar from './SideBar';


function AddSemester() {
    const [semesterName, setSemesterName] = useState("");
    const [year, setYear] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if ( !semesterName || !year) {
            setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }

    
        const formData = new FormData(); 
        formData.append("semesterName", semesterName);
        formData.append("year", year);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/semester/add', formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                     'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200 || response.status === 201) {
                 setMessage("Thêm học kì thành công!");
                // Reset form
                setSemesterName("");
                setYear("");
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
                <h1>Thêm Học Kì</h1>
            </div>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="IdAdmin">Thêm học kì:</label>
                        <input
                            placeholder='HKI/HKII' 
                            type="text" 
                            id="semesterName" 
                            name="semesterName" 
                            value={semesterName} 
                            onChange={(e) => setSemesterName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="year">Niên khóa:</label>
                        <input 
                        placeholder='yyyy-yyyy'
                            type="text" 
                            id="year" 
                            name="year" 
                            value={year} 
                            onChange={(e) => setYear(e.target.value)}
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

export default AddSemester;

