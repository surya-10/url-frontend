import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Base from "./base";

let urlShort = yup.object({
    url: yup.string().required("URL cannot be empty")
})


function GenerateUrl() {
    let [url, setUrl] = useState("");
    let [show, setShow] = useState(false);
    let [urlValue, setUrlValue] = useState("");
    let navigate = useNavigate();
    let { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik({
        initialValues: {
            url: ""
        },
        validationSchema: urlShort,
        onSubmit: (obj) => {
            generateShortId(obj);

        }
    });

    async function generateShortId(obj) {
        let result = await fetch("https://url-backend-aenc.onrender.com/auth", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json"
            }
        })
        let final = await result.json()
        setUrlValue(`https://master--legendary-mandazi-a23d41.netlify.app/${final.id}`);
        setShow(true);
        setUrl(final.id);
    }

    function redirectToUrl() {
        navigate(`/${url}`);
    }
    function copied() {
        alert("copied");
    }
    return (
        <div className="url-div">
            <div className="url-cont">
                <Base>
                <div className="url-body mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="inside-url mt-5">
                            <p className="url-title display-6">URL Shortener</p>
                            <div className="url-content mt-2 d-flex justify-content-center flex-column align-items-center">
                                <p className="h5 text-danger">URL Here !</p>
                                <div className="short mt-2">
                                    <input type="url" placeholder="enter valid URL" className="inp-url form-control mt-3"
                                        name="url"
                                        value={values.url}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </div>
                                {touched.url && errors.url ? <small className="text-danger">URL cannot be empty</small> : ""}
                                <button className="btn bg-success text-white mt-3" type="submit">Short</button>
                            </div>
                        </div>
                    </form>
                    <div className="frn-div d-flex justify-content-center align-content-center">
                        {show &&
                            <div className="d-flex justify-content-center flex-column align-items-center ins-frm">
                                <input type="text" value={urlValue} className="mt-3 frm form-control" />
                                <CopyToClipboard text={urlValue}><i class="fa-solid fa-copy copy" onClick={copied}></i></CopyToClipboard>
                                <a href={url} rel="noopener noreferrer" onClick={() => redirectToUrl} target="_blank" className="go">Open</a>

                            </div>
                        }
                    </div>
                </div>
                </Base>
            </div>
        </div>
    )
}
export default GenerateUrl;