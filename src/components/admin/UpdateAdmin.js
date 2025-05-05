import './Admin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
function UpdateAdmin(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({ 
        idAdmin: '',
        fullName: '',
        birthDay: '',
        gender: '',
        email: '',
        phone: '',
        workDay: '', 
        address: '',
        avatar: null, 
    });
     const [showMessage, setShowMessage] = useState(false);
     useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/${id}`); 
                setAdmin(response.data); 
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };

        fetchAdmin();
    }, [id]);

    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value,
        });
    };
    const handleFileChange = (e) => {
        setAdmin({
          ...admin,
          avatar: e.target.files[0],
        });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('idAdmin', admin.idAdmin);
        formData.append('fullName', admin.fullName);
        formData.append('birthDay', admin.birthDay);
        formData.append('gender', admin.gender);
        formData.append('email', admin.email);
        formData.append('phone', admin.phone);
        formData.append('workDay', admin.workDay);
        formData.append('address', admin.address);
        if (admin.avatar) { 
              formData.append('avatar', admin.avatar);
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/admin/update/${id}`,
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
                      navigate('/systemAdmin');
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
                <h1>Cập nhập tài khoản Admin</h1>
            </div>
            <div className="form-container">
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="idAdmin">Mã Admin:</label>
                        <input type="text" id="idAdmin" name="idAdmin" value={admin.idAdmin} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="workDay">Ngày vào làm:</label>
                        <input type="text" id="workDay" name="workDay" placeholder="dd/mm/yyyy" value={admin.workDay} onChange={handleChange}/>
                    </div>
                    <div className="full-width">
                        <label htmlFor="fullname">Họ và tên:</label>
                        <input type="text" id="fullname" name="fullname" value={admin.fullName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="dob">Ngày sinh:</label>
                        <input type="text" id="dob" name="dob" placeholder="dd/mm/yyyy" value={admin.birthDay} onChange={handleChange}/>
                    </div>
                    <div className="gender-container">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" name="gender" value={admin.gender} onChange={handleChange}>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={admin.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="text" id="phone" name="phone" value={admin.phone} onChange={handleChange}/>
                    </div>
                    <div className="full-width">
                        <label htmlFor="address">Địa chỉ:</label>
                        <input type="text" id="address" name="address" value={admin.address} onChange={handleChange}/>
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
export default UpdateAdmin;