import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const userValidation = yup.object({
    password:yup.string().required("password cannot be empty")
})

function UpdatePassword(){
    let {id, token} = useParams();
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
            password:""
        },
        validationSchema:userValidation,
        onSubmit:(obj)=>{
            updatePass(obj);
        }
    })
    async function updatePass(obj){
        let response = await fetch(`https://url-backend-aenc.onrender.com/update/${id}/${token}`, {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let result = await response.json();
        if(result.msg==="updated" && result.resp===true && result.status===201){
            alert("password has been updated");
            navigate("/login");
        }
        if(result.resp===false && result.msg==="expired" && result.status===400){
            alert("Reset password link expired")
        }

        
    }
    return (
        <div className="sign-page">
            <div className="container-fluid cont min-vh-100 d-flex justify-content-center align-items-center flex-column">
                
                <div className="form">
                <div className="signup-title-div">
                    <p className="fs-4 fw-bold signup-title">Enter new password</p>
                </div>
                    <form onSubmit={handleSubmit}>
                    <div className="signup-form d-flex flex-column">
                        <div className="d-flex flex-column div">
                            <label htmlFor="password" className="names">Password</label>
                            <input type={passwordType} placeholder="new password" id="password" className="form-control pass"
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
                    <div className="btn-gtp d-flex justify-content-start">
                        <button type="submit" className="btn text-white singupbtn mt-3">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default UpdatePassword;