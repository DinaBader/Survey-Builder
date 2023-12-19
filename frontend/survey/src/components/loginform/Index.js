import {useState,React} from 'react';
import "./style.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Index() {
    const [userName, setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const handleUsenameChange = (e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }
    const navigateToSignin = ()=>{
        navigate('/signin');
    }
    const navigateToDashboard = (role)=>{
        if(role=="657edc7c822caeaa5743830b"){
            navigate('/AdminDahsboard');
        }
        else{
            navigate('/UserDashboard');
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios
        .post(
            "http://127.0.0.1:8000/auth/login",
            {
                userName,
                password
            },
            {
                headers:{
                    "Content-Type":"application/json",
                },
            }
        ).then((res)=>{
            const { token, user } = res.data;
            localStorage.setItem("jwt",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            const role=user.Role;
            navigateToDashboard(role);
        }).catch((error)=>{
            setUsername("");
            setPassword("");
            console.log("wrong")
            return;
        })
    }

    return (
       <div className='container'>
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
            <label>
                Username:
            </label>
            <input
            type="text"
            value={userName}
            onChange={handleUsenameChange}
            />
            <br/>
            <label>
                Password:
            </label>
            <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            />
            <br/>
            <button type="submit" className="btn"> Login </button>
            <button type="submit" className='btn' onClick={navigateToSignin}>Signin</button>
        </form>
        </div>
  )
}

export default Index