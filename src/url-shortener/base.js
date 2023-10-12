import { useNavigate } from "react-router-dom";

function Base({children}){

    let navigate = useNavigate();
    return (

        <div className="base-div url-div">
            <div className="url-cont">
            <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-light navbr pb-3">
                    <div class="container-fluid">
                        <p className="dash h6 text-light">
                        <i class="fa-regular fa-user pe-3"><span className="ps-3 fw-bold">{localStorage.getItem("name")}</span></i>
                        </p>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                    <h6 className="dash text-light pe-4" aria-current="page" onClick={()=>navigate("/url-generate")}>URL GENERATE</h6>
                                </li>
                                <li class="nav-item">
                                    <h6 className="dash text-light pe-4" aria-current="page" onClick={()=>navigate("/links")}>LINKS</h6>
                                </li>
                                <li class="nav-item">
                                    <h6 class="dash text-light pe-4" onClick={()=>navigate("/dashboard")}>DASHBOARD</h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="logout-divd-flex justify-content-lg-end">
                        <button className="btn bg-danger text-white me-2 logout-btn ms-4 mt-2" onClick={()=>navigate("/login")}>Logout</button>
                    </div>
                </nav>
                <div className="base-main">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Base;