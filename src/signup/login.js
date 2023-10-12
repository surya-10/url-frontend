import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const userValidation = yup.object({
    email:yup.string().required("email cannot be empty"),
    password:yup.string().required("password cannot be empty")
})

function Login(){
    let navigate = useNavigate();

    let [passwordType, setPasswordType] = useState("password");

    function changeEye(){
        if(passwordType=="password"){
            setPasswordType("text");
        }
        else{
            setPasswordType("password");
        }
    }
    let {values, handleChange, handleSubmit, handleBlur, touched, errors} = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:userValidation,
        onSubmit:(obj)=>{
            createUser(obj);
        }
    })
    async function createUser(obj){
        let response = await fetch("https://url-backend-aenc.onrender.com/login", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let result = await response.json();
        if(result.status===200 && result.resp===true && result.msg==="success"){
            console.log(result.name)
            localStorage.setItem("name", result.name)
            alert("login sucess")
            navigate("/url-generate");
        }
        else if(result.status===400 && result.resp===false && result.msg==="not exist"){
            alert("your account does not exist. Do signup");
            navigate("/");
        }
        else if(result.status===400 && result.resp===false && result.msg==="wrong"){
            document.querySelector(".show-msg").style.display="flex";
        }
        else if(result.status===400 && result.resp===false && result.msg==="not active"){
            navigate(`/message/${result.id}`)
        }
    }
    return (
        <div className="sign-page">
            <div className="container-fluid cont min-vh-100 d-flex justify-content-center align-items-center flex-column">
                
                <div className="form">
                <div className="signup-title-div">
                    <p className="fs-4 fw-bold signup-title">Welcome, Login Here !</p>
                </div>
                    <form onSubmit={handleSubmit}>
                    <div className="signup-form d-flex flex-column">
                        <div className="d-flex flex-column div">
                            <label htmlFor="email" className="names">Email</label>
                            <input type="email" placeholder="enter email" id="email" className="form-control"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                            <i class="fa-solid fa-envelope icon"></i>
                        </div>
                        {touched.email && errors.email ? <small className="text-danger">Email cannot be empty</small>:""}
                        <div className="d-flex flex-column div">
                            <label htmlFor="password" className="names">Password</label>
                            <input type={passwordType} placeholder="enter password" id="password" className="form-control pass"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                            <i class="fa-solid fa-lock icon"></i>
                            <p className="para" onClick={changeEye}>
                            {passwordType=="password"?
                            <i class="fa-solid fa-eye-slash icon2"></i>:
                            <i class="fa-regular fa-eye icon3"></i>
                            
                            
                            }           
                            </p>
                        </div>
                        {touched.password && errors.password ? <small className="text-danger">password cannot be empty</small>:""}
                        
                        
                    </div>
                    <p className="text-danger mt-3 show-msg">invalid credentials</p>
                    <div className="btn-gtp d-flex justify-content-start">
                        <button type="submit" className="btn text-white singupbtn mt-3">Login</button>
                    </div>
                    <p className="frt-pass" onClick={()=>navigate("/forgot-password")}>forgot password ?</p>
                    </form>
        
                    <small className="mt-3 acc">Don't have an account ?<span className="ms-1 text-decoration-underline lgn" onClick={()=>navigate("/")}>Signup</span></small>
                </div>
            </div>
        </div>
    )
}
export default Login;