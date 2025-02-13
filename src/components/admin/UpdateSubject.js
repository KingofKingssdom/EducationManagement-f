import './Admin.css'
import { useState } from 'react';
import Sidebar from './SideBar';
function UpdateSubject(){
    const [showMessage, setShowMessage] = useState(false);
    const handleUpdate = (e) => {
        e.preventDefault(); 
        setShowMessage(true); 
        setTimeout(() => setShowMessage(false), 3000);
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
                <form >
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" value="dang"/>
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password"/>
                    </div>
                    <div>
                        <label for="fullname">Họ và tên:</label>
                        <input type="text" id="fullname" name="fullname"/>
                    </div>
                    <div>
                        <label for="dob">Ngày sinh:</label>
                        <input type="text" id="dob" name="dob" placeholder="dd/mm/yyyy"/>
                    </div>
                    <div className="gender-container">
                        <label for="gender">Giới tính:</label>
                        <select id="gender" name="gender">
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                        </select>
                    </div>
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email"/>
                    </div>
                    <div>
                        <label for="phone">Số điện thoại:</label>
                        <input type="text" id="phone" name="phone"/>
                    </div>
                    
                    <div className="full-width">
                        <label for="address">Địa chỉ:</label>
                        <input type="text" id="address" name="address" />
                    </div>
                    
                    <div className='button-add' onClick={handleUpdate}>Cập nhập</div>
                </form>

            </div>
        </div>
        </div>
        
        </>
    )
}
export default UpdateSubject;