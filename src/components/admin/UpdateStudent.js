import './Admin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Sidebar from './SideBar';
function UpdateStudent(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({ 
        idStudent: '',
        fullName: '',
        birth: '',
        gender: '',
        email: '',
        phone: '',
        classroom: '',
        studyDay: '', 
        address: '',
        avatar: null, 
    });
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/student/${id}`); 
                setStudent(response.data); 
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };

        fetchStudent();
    }, [id]);
    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };
    const handleFileChange = (e) => {
        setStudent({
          ...student,
          avatar: e.target.files[0],
        });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('idStudent', student.idStudent);
        formData.append('fullName', student.fullName);
        formData.append('birth', student.birth);
        formData.append('gender', student.gender);
        formData.append('email', student.email);
        formData.append('phone', student.phone);
        formData.append('classroom', student.classroom);
        formData.append('studyDay', student.studyDay);
        formData.append('address', student.address);

        if (student.avatar) { 
              formData.append('avatar', student.avatar);
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/student/update/${id}`,
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
                      navigate('/systemStudent');
                  }, 3000);
             } else {
                
                console.error('Update failed:', response);
                alert('Cập nhật thất bại. Vui lòng thử lại.');

             }


        } catch (error) {
            console.error("Error updating student:", error);
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
                <h1>Cập nhập tài khoản học sinh</h1>
            </div>
            <div className="form-container">
                <form onSubmit={handleUpdate}>
                <div>
                            <label htmlFor="idStudent">Mã học sinh:</label>
                            <input type="text" id="idStudent" name="idStudent" value={student.idStudent} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="fullName">Họ và tên:</label>
                            <input type="text" id="fullName" name="fullName" value={student.fullName} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="birth">Ngày sinh:</label>
                            <input type="text" id="birth" name="birth" placeholder="dd/mm/yyyy" value={student.birth} onChange={handleChange} />
                        </div>
                        <div className="gender-container">
                            <label htmlFor="gender">Giới tính:</label>
                            <select id="gender" name="gender" value={student.gender} onChange={handleChange}>
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={student.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="phone">Số điện thoại:</label>
                            <input type="text" id="phone" name="phone" value={student.phone} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="classroom">Lớp học:</label>
                            <input type="text" id="classroom" name="classroom" value={student.classroom} onChange={handleChange} />
                        </div>
                         <div>
                            <label htmlFor="studyDay">Ngày học:</label>
                            <input type="text" id="studyDay" name="studyDay" value={student.studyDay} onChange={handleChange} />
                        </div>
                        <div className="full-width">
                            <label htmlFor="address">Địa chỉ:</label>
                            <input type="text" id="address" name="address" value={student.address} onChange={handleChange} />
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
export default UpdateStudent;