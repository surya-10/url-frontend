import { useState } from "react";
import { useParams } from "react-router-dom"

function Shorten(){
    let {shortId} = useParams();
    const [redirectUrl, setRedirectUrl] = useState("");

    async function redirect(){
        let result = await fetch(`https://url-backend-aenc.onrender.com/auth/${shortId}`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })
        let resp = await result.json();
        if(resp.status===200){
            window.location.replace(resp.url);
        }
    }
    redirect();
    return (
        <div className="shorten-div">
            <p>Redirecting....</p>
        </div>
    )
}

export default Shorten;