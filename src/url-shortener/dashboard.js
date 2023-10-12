import { useEffect, useState } from "react";
import Base from "./base";

function GeneratedLink() {
    let [links, setLinks] = useState([]);

    useEffect(() => {
        async function getLinks() {
            let links = await fetch("https://url-backend-aenc.onrender.com/auth/links/all", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            let generatedLinks = await links.json();

            setLinks(generatedLinks.allLinks);
        }

        getLinks();

    }, []);
    let date = new Date();
    let currentDate = date.getDate();
    let getCurrentMonth = date.getMonth()+1;
    let getCurrentYear = date.getFullYear();

    console.log(links)
    return (
        <div className="url-div dashboard-div">
            <div className="url-cont">
                <Base>
                    <div className="display-links">
                        <h5 className="mt-4 mb-4">Generated Links</h5>
                        <div className="tables">
                            <table className="table">
                                {links.map((val, ind)=>(
                                        <tr className="tr">
                                            <td className="td"><span className="span text-info">LongUrl</span><p title="LongUrl">{val.longUrl}</p></td>
                                            <td className="td"><span className="span text-info">ShortUrl</span><p title="shortUrl">https://master--legendary-mandazi-a23d41.netlify.app/{val.shortID}</p></td>
                                        </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </Base>
            </div>
        </div>
    )
}
export default GeneratedLink;