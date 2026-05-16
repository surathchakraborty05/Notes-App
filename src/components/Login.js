import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [credentials,setcredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify({email: credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json);
        console.log("LOGIN RESPONSE:", json);
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.setAlert("Logged In Successfully","success");
        }
        else{
            props.setAlert("Invalid Details","danger");
        }
    }
    const onChange = (e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }
    return (
        <div>
            <div className="container mt-3">
            <h2>Login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"onChange={onChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={credentials.password} className="form-control" id="password" name="password" placeholder="Password"onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form></div>
        </div>
    )
}

export default Login
