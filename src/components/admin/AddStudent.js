import './Admin.css';
import axios from 'axios';
import { useState } from 'react';
import Sidebar from './Sidebar.js';


function AddStudent() {
    const [idStudent, setIdStudent] = useState("");
    const [studyDay, setStudyDay] = useState("");
    const [fullName, setFullName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [classroom, setClassroom] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if ( !fullName || !email) {
            setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }

        const formData = new FormData();
        formData.append("idStudent", idStudent);
        formData.append("studyDay", studyDay);
        formData.append("fullName", fullName);
        formData.append("birth", birth);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("classroom", classroom);
        formData.append("address", address);
        if (avatar) {
            formData.append("avatar", avatar);
        }
        

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/student/add',formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200 || response.status === 201) {
                 setMessage("Thêm học sinh thành công!");
                // Reset form
                setIdStudent("");
                setStudyDay("");
                setFullName("");
                setBirth("");
                setGender("");
                setEmail("");
                setPhone("");
                setClassroom("");
                setAddress("");
                setAvatar(null);
            } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                alert("Đã có lỗi xảy ra vui lòng kiểm tra lại dữ liệu")
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
                <h1>Thêm học sinh</h1>
            </div>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="idStudent">Mã học sinh:</label>
                        <input 
                            type="text" 
                            id="idStudent" 
                            name="idStudent" 
                            value={idStudent} 
                            onChange={(e) => setIdStudent(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="studyDay">Ngày vào học:</label>
                        <input 
                            placeholder='dd/mm/yyyy'
                            type="text" 
                            id="studyDay" 
                            name="studyDay" 
                            value={studyDay} 
                            onChange={(e) => setStudyDay(e.target.value)}
                            required
                        />
                    </div>
                    <div className="full-width">
                        <label htmlFor="fullName">Họ và tên:</label>
                        <input 
                            type="text" 
                            id="fullName" 
                            name="fulName" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dob">Ngày sinh:</label>
                        <input 
                            placeholder='dd/mm/yyyy'
                            type="text" 
                            id="dob" 
                            name="dob" 
                            value={birth} 
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>
                    <div className="gender-container">
                        <label htmlFor="gender">Giới tính:</label>
                        <select 
                            id="gender" 
                            name="gender" 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="classroom">Lớp học:</label>
                        <input 
                            type="text" 
                            id="classroom" 
                            name="classroom" 
                            value={classroom} 
                            onChange={(e) => setClassroom(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="avatar">Chọn ảnh đại diện:</label>
                        <input 
                            type="file" 
                            id="avatar" 
                            name="avatar" 
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                        />
                    </div>
                    <div className="full-width">
                        <label htmlFor="address">Địa chỉ:</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button className='button-add' type="submit">Thêm</button>
                </form>
            </div>
        </div>
        </div>
        
    );
}

export default AddStudent;
