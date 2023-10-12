import { useNavigate, useParams } from "react-router-dom";

function Message() {
    let navigate = useNavigate();
    let { id } = useParams();
    async function resendLink(id) {
        let res = await fetch(`https://url-backend-aenc.onrender.com/resend/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        let response = await res.json();
        if (response.status === 201 && response.resp === true) {
            navigate("/notice");
        }
    }
    return (
        <div className="msg-div min-vh-100 d-flex justify-content-center align-items-center flex-column">
            <div className="msg">
                <p className="fs-5">Your email already registered but your account not yet activated. Click on the below button to activate your account</p>
                <button className="btn bg-success text-white" onClick={()=>resendLink(id)}>Activate</button>
            </div>

        </div>
    )
}
export default Message;