import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    let navigate = useNavigate();
    let { id, token } = useParams();
    resetPassword(id, token)

    async function resetPassword(id, token){

        let result = await fetch(`https://url-backend-aenc.onrender.com/reset/${id}/${token}`, {
            method:"GET",
            headers: {
                "content-type": "application/json"
            }
        })
        let output = await result.json();
        if(output.msg==="verified" && output.resp===true){
            setTimeout(()=>{
                navigate(`/update-password/${id}/${token}`)
            }, 2000)
        }
        if(output.msg==="expired" && output.resp===false){
            setTimeout(()=>{
                alert("Password reset link has been expired");
                navigate("/login");
            }, 2000)
        }
        
    }

    
    return (
        <div className="activate-div min-vh-100 d-flex justify-content-center align-items-center flex-column">
            <div class="spin">
            <div class="spinner-border text-white" role="status">
                <span class="sr-only">Loading...</span>
            </div>      
            </div>
            <div className="activate">
                <h4 className="text-light verified">Please wait</h4>
                <p className="text-light txt fs-4">We are verifying your request</p>
            </div>
            <div className="verification d-flex justify-content-center flex-column align-items-center">
                <p className="not-verified text-white fs-5">Your account is not activated yet. Click on below button to activate your account.</p>
                <button className="resend btn bg-danger not-verified text-white">Resend</button>
            </div>
        </div>
    )
}
export default ResetPassword;