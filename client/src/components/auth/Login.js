import React ,{useState,useContext,useEffect}from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { setAlert } = alertContext;
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;
  
  useEffect(() => {
    if (isAuthenticated) {
        navigate(`/`);
    };

    if (error === 'Invalid credentials') {
      setAlert('Invalid credentials.', 'danger');
      clearErrors();
    };
    
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

    const [user ,setUser]=useState({
       
        email:'',
        password:''
    })
    const {email,password}=user;

    const onChange=e=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    };

    const onSubmit= e=>{
        e.preventDefault();
        if (email === '' || password === "") {
            setAlert('user aleredy exists', 'danger');
          } else {
            loginUser({ email, password });
          };
    };
    return (
        <div className='form-container'>
            <h1>
                Account<span className='text-primary'> Login</span>
            </h1>
            <form onSubmit={onSubmit}> 
               
                <div className='form-group'>
                    <label htmlFor='email' >Email Address</label>
                    <input type='email' name='email' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password' >Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} />
                </div>
               
                <input type='submit' value="Login" className='btn btn-primary btn-block'/>
            </form>
            
        </div>
    )
}

export default Login
