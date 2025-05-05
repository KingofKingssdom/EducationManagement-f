import { FaRegArrowAltCircleRight } from "react-icons/fa";
import './Admin.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function Home(){
    const [countStudent, setCountStudent] = useState("");
    const [countSubject, setCountSubject] = useState("");
    const [countSemester, setCountSemester] = useState("");
    const [countTeacher, setCountTeacher] = useState("");
    const [countAdmin, setCountAdmin] = useState("");
    useEffect(() => {

        const fetchCountStudents = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/student/count',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCountStudent(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchCountStudents();
    }, []);


    useEffect(() => {
   
        const fetchCountSubjects = async () => {
            try {
                const token  = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/subject/count', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCountSubject(response.data);
            } catch (error) {
                console.error('Error fetching subject:', error);
            }
        };

        fetchCountSubjects();
    }, []);


    useEffect(() => {
  
        const fetchCountSemesters = async () => {
            try {
                const token  = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/semester/count',{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }});
                setCountSemester(response.data);
            } catch (error) {
                console.error('Error fetching semester:', error);
            }
        };

        fetchCountSemesters();
    }, []);

    useEffect(() => {
    
        const fetchCountTeachers = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/teacher/count', {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCountTeacher(response.data);
            } catch (error) {
                console.error('Error fetching teacher:', error);
            }
        };

        fetchCountTeachers();
    }, []);

    useEffect(() => {

        const fetchCountAdmins = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/admin/count',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCountAdmin(response.data);
            } catch (error) {
                console.error('Error fetching teacher:', error);
            }
        };

        fetchCountAdmins();
    }, []);
    return(
        <>
        <div className="container-admin">
            <Sidebar/>
        <div className="container-home">
        <div className="content">
        <div className="header">
            <div className="menu-icon"><i className="fas fa-bars"></i></div>
            <hr></hr>
        </div>
        <div className="cards">
            <div className="card blue">
                <h3>{countStudent}</h3>
                <p>Học sinh</p>
                <Link to="/systemStudent"><div className="details" >Chi tiết <i><FaRegArrowAltCircleRight /></i> </div></Link> 
            </div>
            <div className="card darkblue">
                <h3>{countTeacher}</h3>
                <p>Giáo viên</p>
                <Link to="/systemTeacher"><div className="details">Chi tiết <i><FaRegArrowAltCircleRight /></i> </div></Link> 
            </div>
            <div className="card green">
                <h3>{countAdmin}</h3>
                <p>Admin</p>
                <Link to="/systemAdmin"><div className="details">Chi tiết <i><FaRegArrowAltCircleRight /></i> </div></Link> 
            </div>
            <div className="card yellow">
                <h3>{countSubject}</h3>
                <p>Môn học</p>
                <Link to="/viewSubject"><div className="details">Chi tiết <i><FaRegArrowAltCircleRight /></i></div></Link> 
            </div>
            <div className="card red">
                <h3>{countSemester}</h3>
                <p>Học kì</p>
                <Link to="/viewSemester"><div className="details">Chi tiết <i><FaRegArrowAltCircleRight /></i></div></Link> 
            </div>
        </div>
    </div>
        </div>
        </div>
        
       
        </>
    )
}
export default Home;