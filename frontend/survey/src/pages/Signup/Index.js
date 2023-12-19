import {useState,React} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Index() {
    const [userName, setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [Role,setRole]=useState('');
    const navigate=useNavigate();
    const handleUsenameChange = (e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }
    const handleFirstNameChange = (e)=>{
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e)=>{
        setLastName(e.target.value);
    }
    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    }
    const handleRoleChange = (e)=>{
        setRole(e.target.value);
    }
    const navigateToLogin = ()=>{
        navigate('/');
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios
        .post(
            "http://127.0.0.1:8000/auth/register",
            {
                userName,
                password,
                firstName,
                lastName,
                email,
                Role
            },
            {
                headers:{
                    "Content-Type":"application/json",
                },
            }
        ).then((res)=>{
            localStorage.setItem("jwt",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            console.log("logged in!");
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
        <h1>Sign Up</h1>
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
            <label>
                Firstname:
            </label>
            <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            />
            <br/>
            <label>
                LastName:
            </label>
            <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            />
            <br/>
            <label>
                Email:
            </label>
            <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            />
            <br/>
            <label>
                Role:
            </label>
            <input
            type="text"
            value={Role}
            onChange={handleRoleChange}
            />
            <br/>
            <button type="submit" className="btn"> Signup </button>
            <button type="submit" className='btn' onClick={navigateToLogin}>Login</button>
        </form>
        </div>
  )
}

export default Index