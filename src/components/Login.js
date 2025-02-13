import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            usernameOrEmail,
            password,
        });

        if (response.status === 200) {
            const token = response.data.accessToken;

            if (token) {
                localStorage.setItem('token', token);
                try {
                    // Giải mã payload từ token
                    const base64Url = token.split('.')[1];
                    if (base64Url) {
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const payloadString = atob(base64);
                        const payload = JSON.parse(payloadString);

                        // Kiểm tra roles và điều hướng
                        if (payload && payload.roles && payload.roles.includes("ROLE_ADMIN")) {
                            navigate('/adminPage');
                        } else if (payload && payload.roles && payload.roles.includes("ROLE_TEACHER")) {
                            navigate('/teacherPage');
                        } else {
                            // Nếu không có role phù hợp, có thể điều hướng đến trang mặc định hoặc hiển thị thông báo
                            console.warn("User has no recognized roles, navigating to default page.");
                            navigate('/home'); // Ví dụ: điều hướng đến trang home
                        }
                    } else {
                        setErrorMessage("Invalid token format: missing payload.");
                    }
                } catch (error) {
                    console.error("Error decoding or parsing token:", error);
                    setErrorMessage("Could not process login, invalid token.");
                    // Có thể cần logout ở đây nếu token đã được lưu nhưng không hợp lệ
                    localStorage.removeItem('token');
                }
            } else {
                setErrorMessage("Token is undefined in response.");
            }
        } else {
            setErrorMessage(`Login failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Login failed:", error);
        if (error.response) {
            console.error("Error Response Data:", error.response.data);
            setErrorMessage(`Login failed: ${error.response.data.message || 'Something went wrong'}`);
        } else if (error.request) {
            setErrorMessage("Network error. Could not connect to server.");
        } else {
            setErrorMessage("An unexpected error occurred.");
        }
    }
};


  return (
    <div className="bg-login">
        <div className="login-container">
      <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <div>
                <label htmlFor="usernameOrEmail">Username or Email:</label>
                <input
                    type="text"
                    id="usernameOrEmail"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className="btn-login" type="submit">Login</button>
        </form>
    
    </div>
    </div>
    
  );
}
export default Login;