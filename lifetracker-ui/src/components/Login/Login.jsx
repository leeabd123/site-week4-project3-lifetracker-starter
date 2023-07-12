import './Login.css';
import '../Register/Register.css';
import { useEffect, useState } from 'react';
import apiClient from "../../../services/appClient";
import { useNavigate, Link } from 'react-router-dom';

function Login({ setUser, setIsAuthenticated, setAppState }) {
  const [processing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const { data, error } = await apiClient.fetchUserFromToken();
    if (data) {
    
      setUser(data.user);
      setIsAuthenticated(true);
      navigate("/Activity");
    }
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, form: error }));
    }
  };

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));
  
    const { data, error, status } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });
  
    if (error) {
      if (status === 401) {
        setErrors((e) => ({ ...e, form: "User not found. Please check your credentials." }));
      } else {
        setErrors((e) => ({ ...e, form: error }));
      }
    } else if (data?.user) {
      setAppState((prevState) => ({
        ...prevState,
        user: data.user,
        isAuthenticated: true,
        email: form.email
      }));
      apiClient.setToken(data.token);
      localStorage.setItem("token", data.token)
      setIsProcessing(false);
      navigate("/Activity");
      window.location.reload();
    }
  };
  
  return (
    <div className="login">
        <div className='login-form-container'>
        <h1 className='login-title'>Welcome</h1>

        <form className="login-form" onSubmit={handleOnSubmit}>

        <label htmlFor="email">Email:</label><br />
        <input
          type="text"
          id="email"
          name="email"
          value={form.email}
          onChange={handleOnInputChange}
        /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleOnInputChange}
        /><br />

        <input className='login-submit' type="submit" value="Submit" />
        {errors.form && <p className="error">{errors.form}</p>}

      </form>

        </div>
      
    </div>
  );
}

export default Login;
