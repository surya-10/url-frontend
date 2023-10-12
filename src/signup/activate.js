import { useNavigate, useParams } from "react-router-dom";

function Activate() {
    let navigate = useNavigate();
    let { id, token } = useParams();
    verifyToken(id, token);

    async function resendLink(id){
        let res = await fetch(`https://url-backend-aenc.onrender.com/resend/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            } 
        })
        let response = await res.json();
        if(response.status===201 && response.resp===true){
            navigate("/notice");
        }
    }

    async function verifyToken(id, token) {
        let result = await fetch(`https://url-backend-aenc.onrender.com/activate/${id}/${token}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        let response = await result.json();
        if(response.status===200 && response.msg==="verified"){
            setTimeout(()=>{
                document.querySelector(".verified").style.display="none";
                document.querySelector(".txt").innerHTML="Verified";
                document.querySelector(".spin").style.display ="none";
            }, 1500)
            setTimeout(()=>{
                alert("your account has been activated. Login to continue");
                navigate("/login");
            }, 2000)
            
        }
        else{
            setTimeout(()=>{
                document.querySelector(".verified").style.display="none";
                document.querySelector(".spin").style.display ="none";
                document.querySelector(".txt").innerHTML="Account activation link has been expired";
                const nodeList = document.querySelectorAll(".not-verified");
                for (let i = 0; i < nodeList.length; i++) {
                    nodeList[i].style.display = "flex";
                }

            }, 1500)
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
                <button className="resend btn bg-danger not-verified text-white" onClick={()=>resendLink(id)}>Resend</button>
            </div>
        </div>
    )
}
export default Activate;