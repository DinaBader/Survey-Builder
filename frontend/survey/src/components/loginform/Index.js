import {useState,React} from 'react';
import "./style.css";
import axios from 'axios'
function Index() {
    const [username, setUsername]=useState('');
    const [password,setPassword]=useState('');
    const handleUsenameChange = (e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios
        .post(
            "http://localhost:8000/auth/login",
            {
                username,
                password,
            },
            {
                headers:{
                    "Access-Control-Allow-Origin":"*",
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
            }
        ).then((res)=>{
            localStorage.setItem("jwt",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            console.log("logged in!");
        }).catch((error)=>{
            setUsername("");
            setPassword("");
            return;
        })
    }

    return (
       <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
            </label>
            <input
            type="text"
            value={username}
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
            <button type="submit"> Login </button>
        </form>
        </div>
  )
}

export default Index