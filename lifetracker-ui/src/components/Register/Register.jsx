import { useState } from 'react';
import apiClient from "../../../services/appClient";
import { useNavigate, Link } from 'react-router-dom';

function Register({ setUser, setIsAuthenticated, setAppState }) {
  const [processing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    first_name: "",
    last_name: "",
  });
  const navigate = useNavigate();

  const handleOnInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    if (name === "email") {
      if (value.indexOf("@") === -1) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email." }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: null }));
      }
    }

    if (name === "passwordConfirm" && value !== form.password) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "Passwords do not match" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: null }));
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrors((prevErrors) => ({ ...prevErrors, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: "Passwords do not match" }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signupUser({
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
    });

    if (error) {
      if (error.includes("Duplicate email")) {
        setErrors((prevErrors) => ({ ...prevErrors, form: "Email already exists. Please choose a different email." }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, form: error }));
      }
      setIsProcessing(false);
      return;
    }

    if (data?.user) {
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

    setIsProcessing(false);
  };


  return (
    <div className="register">
     <div className='reg-form-container'>
     <h2 className='reg-title'>Register</h2>

     <form className='reg-form' onSubmit={handleOnSubmit}>
        <div className="reg-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleOnInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="reg-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleOnInputChange}
          />
        </div>

        <div className="reg-form-group">
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleOnInputChange}
          />
          {errors.passwordConfirm && <p className="error">{errors.passwordConfirm}</p>}

        </div>

        <div className="reg-form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={form.first_name}
            onChange={handleOnInputChange}
          />
        </div>

     
        <div className="reg-form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleOnInputChange}
          />
        </div>

        <button className='reg-submit' type="submit">
          Submit
        </button>
        
        {errors.form && <p className="error">{errors.form}</p>}
      </form>
    </div>
     </div>
     
  );
}

export default Register;
