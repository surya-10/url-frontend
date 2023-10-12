import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const userValidation = yup.object({
    email:yup.string().required("email cannot be empty")
})

function ForgotPassword(){
    let navigate = useNavigate();

    let [passwordType, setPasswordType] = useState("password");

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
        let response = await fetch("http://localhost:9003/forgot", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let result = await response.json();
        if(result.status===201 && result.resp===true){
            alert("password reset link has been sent to your email.")
            navigate("/login");
        }
        else if(result.status===400 && result.resp===false && result.msg==="not exist"){
            alert("your account does not exist. Do signup");
            navigate("/");
        }
    }
    return (
        <div className="sign-page">
            <div className="container-fluid cont min-vh-100 d-flex justify-content-center align-items-center flex-column">
                
                <div className="form">
                <div className="signup-title-div">
                    <p className="fs-4 fw-bold signup-title">Enter your email</p>
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
                    </div>
                    <div className="btn-gtp d-flex justify-content-start">
                        <button type="submit" className="btn text-white singupbtn mt-3">Verify</button>
                    </div>
                    </form>
        
                    <small className="mt-3 acc">Don't have an account ?<span className="ms-1 text-decoration-underline lgn" onClick={()=>navigate("/")}>Signup</span></small>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword;