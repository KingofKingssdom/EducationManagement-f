import './Admin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Sidebar from './SideBar';
function UpdateTeacher(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState({ 
        idTeacher: '',
        fullName: '',
        birthDay: '',
        gender: '',
        email: '',
        phone: '',
        classroom: '',
        subject:'',
        workDay: '', 
        address: '',
        avatar: null, 
    });
     const [showMessage, setShowMessage] = useState(false);
     useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/teacher/${id}`); 
                setTeacher(response.data); 
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };

        fetchTeacher();
    }, [id]);

    const handleChange = (e) => {
        setTeacher({
            ...teacher,
            [e.target.name]: e.target.value,
        });
    };
    const handleFileChange = (e) => {
        setTeacher({
          ...teacher,
          avatar: e.target.files[0],
        });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('idTeacher', teacher.idTeacher);
        formData.append('fullName', teacher.fullName);
        formData.append('birthDay', teacher.birthDay);
        formData.append('gender', teacher.gender);
        formData.append('email', teacher.email);
        formData.append('phone', teacher.phone);
        formData.append('classroom', teacher.classroom);
        formData.append('workDay', teacher.workDay);
        formData.append('address', teacher.address);
        formData.append('subject',teacher.subject);

        if (teacher.avatar) { 
              formData.append('avatar', teacher.avatar);
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/teacher/update/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

             if (response.status === 200) {
                  setShowMessage(true);
                  setTimeout(() => {
                      setShowMessage(false);
                      navigate('/systemTeacher');
                  }, 3000);
             } else {
                
                console.error('Update failed:', response);
                alert('Cập nhật thất bại. Vui lòng thử lại.');

             }


        } catch (error) {
            console.error("Error updating teacher:", error);
            alert('Cập nhật thất bại. Vui lòng kiểm tra lại dữ liệu.');

        }
    };
    return(
        <>
        <div className='container-admin'>
            <Sidebar/>
            <div className="content">
        {showMessage && <div className="boxup">
                    <p>Cập nhập thành công!</p>
                </div> }
            <div className="header-add">
                <h1>Cập nhập tài khoản giáo viên</h1>
            </div>
            <div className="form-container">
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="idTeacher">Mã giáo viên:</label>
                        <input type="text" id="idTeacher" name="idTeacher" value={teacher.idTeacher} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="workDay">Ngày vào làm:</label>
                        <input type="text" id="workDay" name="workDay" placeholder="dd/mm/yyyy" value={teacher.workDay} onChange={handleChange}/>
                    </div>
                    <div className="full-width">
                        <label htmlFor="fullname">Họ và tên:</label>
                        <input type="text" id="fullname" name="fullname" value={teacher.fullName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="dob">Ngày sinh:</label>
                        <input type="text" id="dob" name="dob" placeholder="dd/mm/yyyy" value={teacher.birthDay} onChange={handleChange}/>
                    </div>
                    <div className="gender-container">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" name="gender" value={teacher.gender} onChange={handleChange}>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={teacher.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="text" id="phone" name="phone" value={teacher.phone} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="classroom">Lớp học:</label>
                        <input type="text" id="classroom" name="classroom" value={teacher.classroom} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="subject">Môn dạy:</label>
                        <input type="text" id="subject" name="subject" value={teacher.subject} onChange={handleChange}/>
                    </div>
                   
                    <div className="full-width">
                        <label htmlFor="address">Địa chỉ:</label>
                        <input type="text" id="address" name="address" value={teacher.address} onChange={handleChange}/>
                    </div>
                    <div>
                           <label htmlFor="avatar">Avatar:</label>
                           <input type="file" id="avatar" name="avatar" onChange={handleFileChange} />
                    </div>
                    <button type='submit' className='button-add' >Cập nhật</button>
                </form>
            </div>
        </div>
        </div>
        
        </>
    )
}
export default UpdateTeacher;