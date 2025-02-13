import "./Admin.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./SideBar";

function SystemAdmin () {
    const [admin, setAdmin] = useState([]);
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/admin/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAdmin(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchAdmin();
    }, []);
    return(
        <>
        <div className="container-admin">
            <Sidebar/>
            <div className="content">
            <h1>Tài khoản Admin</h1>
            
            <div className="limited">
            <table class="table table-light table-striped table-bordered table-hover">
            <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Admin</th>
                            <th className="fullName-table">Họ và tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th className="address-table">Địa chỉ</th>
                            <th className="repair-table">Điều chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                    {admin.map((admin, index) => (
                                <tr key={admin.id || index}>
                                    <td>{admin.id}</td>
                                    <td>{admin.idAdmin}</td>
                                    <td>{admin.fullName}</td>
                                    <td>{admin.birthDay}</td>
                                    <td>{admin.gender}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.phone}</td>
                                    <td>{admin.address}</td>
                                    <td>
                                        <Link to={`/updateAdmin/${admin.id}`}>
                                            <button className="btn btn-update">Cập nhật</button>
                                        </Link>
                                        {' - '}
                                        <button className="btn btn-delete">Xóa</button>
                                    </td>
                                </tr>
                            ))}

                    </tbody>
        </table>
            </div>
             
        </div>
        </div>
        
        
        </>
    )
}
export default SystemAdmin;