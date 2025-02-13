import './Admin.css';
import axios from 'axios';
import { useState } from 'react';
import Sidebar from './SideBar';


function AddTeacher() {
    const [idTeacher, setIdTeacher] = useState("");
    const [workDay, setWorkDay] = useState("");
    const [fullName, setFullName] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [classroom, setClassroom] = useState("");
    const [subject, setSubject] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
        formData.append("idTeacher", idTeacher);
        formData.append("workDay", workDay);
        formData.append("fullName", fullName);
        formData.append("birthDay", birthDay);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("classroom", classroom);
        formData.append("subject", subject);
        formData.append("address", address);
        formData.append("username", username);
        formData.append("password", password);
        if (avatar) {
            formData.append("avatar", avatar);
        }
        

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/teacher/add', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200 || response.status === 201) {
                 setMessage("Thêm giáo viên thành công!");
                // Reset form
                setIdTeacher("");
                setWorkDay("");
                setFullName("");
                setBirthDay("");
                setGender("");
                setEmail("");
                setPhone("");
                setClassroom("");
                setSubject("");
                setAddress("");
                setUsername("");
                setPassword("");
                setAvatar(null);
            } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage("Có lỗi");
            } else {
                alert("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
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
                <h1>Thêm giáo viên</h1>
            </div>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="idTeacher">Mã giáo viên:</label>
                        <input 
                            type="text" 
                            id="idTeacher" 
                            name="idTeacher" 
                            value={idTeacher} 
                            onChange={(e) => setIdTeacher(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="wordDay">Ngày vào làm:</label>
                        <input 
                            placeholder='dd/mm/yyyy'
                            type="text" 
                            id="workDay" 
                            name="workDay" 
                            value={workDay} 
                            onChange={(e) => setWorkDay(e.target.value)}
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
                            value={birthDay} 
                            onChange={(e) => setBirthDay(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="text" 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
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
                        <label htmlFor="subject">Môn dạy:</label>
                        <input 
                            type="text" 
                            id="subject" 
                            name="subject" 
                            value={subject} 
                            onChange={(e) => setSubject(e.target.value)}
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

export default AddTeacher;
