import './Admin.css'
import React, { useEffect, useState } from 'react';
import { FaUser, FaHome, FaAddressBook, FaList, FaSearch, FaTable, FaFacebookMessenger  } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { MdOutlineSubject } from "react-icons/md";
import {Link} from "react-router-dom";
function Sidebar() {
    const [account, setAccount] = useState(false);
    const toggleAccount = () => {
       setAccount(!account) ;
      };
    
    const [show, setShow] = useState(false);
    const tonggleShow = () =>{
        setShow(!show)
    }

    const [table, setTable] = useState(false);
    const tonggleTable = () => {
        setTable(!table);
    }

    const [subject, setSubject] = useState(false);
    const tonggleSubject = () => {
        setSubject(!subject);
    }
    
    const[semester, setSemester] = useState(false);
    const tonggleSemester = () =>{
        setSemester(!semester);
    }
    const [fullName, setFullName] = useState('');
    useEffect(() => {
                const token = localStorage.getItem('token');
                if(token) {
                    const payload = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
                    setFullName(payload.fullName);
                }    
        },[]);
    return(
        <>
    <div className="sidebar"> 
        <h4>TRƯỜNG THPT</h4>
        <h4> TRẦN HƯNG ĐẠO</h4>
        <h5>Xin chào quản trị viên</h5>
        <ul>
            <span><i><FaUser /></i> Tài khoản: </span>
                <div className='display-username'><h5>{fullName}</h5></div> 
            <li><Link to="/adminPage"> <i><FaHome /></i> Trang chủ</Link> </li>
             <span>Tài khoản</span> 
            <li className='dropdown'>
                <div className='' onClick={toggleAccount}><FaAddressBook /> Thêm tài khoản <MdOutlineKeyboardArrowDown /></div>
               {account && <ul >
                        <li><Link to="/addTeacher">Giáo viên</Link></li>
                        <li><Link to="/addStudent">Học Sinh</Link> </li>
                        <li><Link to="/addAdmin">Admin</Link></li>
                     </ul> } 
            </li>

            <li className='dropdown'>
                <div className='' onClick={tonggleShow}><GiAutoRepair /> Chỉnh sửa <MdOutlineKeyboardArrowDown /></div>
               {show && <ul>
                        <li><Link to="/systemTeacher"> Giáo Viên</Link> </li>
                        <li><Link to="/systemStudent">Học Sinh</Link> </li>
                        <li><Link to="/systemAdmin">Admin</Link> </li>
                     </ul> } 
            </li>
            <span>Thông tin/Điểm</span>
            <li><Link to="/listClass"><FaList /> Danh sách lớp </Link> </li>
            <li><Link to="/listTeacher"><FaSearch /> Tra cứu giáo viên</Link> </li>
            <li className='dropdown'>
                <div className='' onClick={tonggleTable}><FaTable /> Bảng điểm <MdOutlineKeyboardArrowDown /></div>
               {table && <ul>
                        <li> <Link to="/subjectTable">Xem điểm</Link> </li>
                        <li> <Link to="/addMark"> Nhập điểm</Link> </li>
                     </ul> } 
            </li>
            <span>Qui định</span>
            <li className='dropdown'>
            <div onClick={tonggleSemester}>
                 <MdOutlineSubject /> Học kì <MdOutlineKeyboardArrowDown />
            </div>
            {semester && <ul>
                           <li><Link to="/addSemester">Thêm học kì</Link></li>
                            <li><Link to="/viewSemester">Chỉnh sửa học kì</Link></li> 
                        </ul>}
           </li>
            <li className='dropdown'>
                <div onClick={tonggleSubject}> <MdOutlineSubject /> Môn học <MdOutlineKeyboardArrowDown /></div>
                {subject && <ul>
                        <li><Link to="/addSubject">Thêm môn học</Link></li>
                        <li><Link to="/viewSubject">Chỉnh sửa môn học</Link></li>
                        </ul>}
            </li>
            <span>Trao đổi</span>
            <li><FaFacebookMessenger /> Tin nhắn</li>
        </ul>
    </div>
    
        </>
    )
}
export default Sidebar;