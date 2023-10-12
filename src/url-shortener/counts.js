import { useEffect, useState } from "react";
import Base from "./base";

function GetCounts() {
  let [selectedValue, setSelectedValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(false);
  let [dailyLinks, setDailyLinks] = useState([]);
  let [monthlyLinks, setMonthlyLinks] = useState([]);
  function setValue(e) {
    setSelectedValue(e.target.value);
  }
  useEffect(() => {
    async function getLinkCounts() {
      console.log(selectedValue)
      let result = await fetch(`https://url-backend-aenc.onrender.com/auth/count/${selectedValue}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })

      let output = await result.json();
      if (selectedValue === "day") {
        setDailyLinks(output.urls);
        setSelectedOption(true);
        setMonthlyLinks([]);
      }
      if (selectedValue === "month") {
        setMonthlyLinks(output.urls);
        setSelectedOption(true);
        setDailyLinks([]);
      }
    }
    getLinkCounts();
  }, [selectedValue]);
  return (
    <div className="url-div dashboard-div">
      <div className="url-cont">
        <Base>
          <div className="radio-div">
            <p className="mt-4 h5 tit fw-bolder">SELECT A FIELD TO DISPLAY</p>
            <input type="radio" id="html" name="fav_language" value="day" onChange={e => setSelectedValue(e.target.value)} />
            <label htmlFor="html" className="rad ms-2">Day</label>
            <input type="radio" id="css" name="fav_language" value="month" onChange={e => setSelectedValue(e.target.value)} className="ms-3" />
            <label htmlFor="css" className="rad ms-2">Month</label>
          </div>
          {selectedValue === "day" && selectedOption===true? 
          <div className="daily-links-div">
            <table className="dash-table">
              <tr className="dash-tr">
                <th className="dash-th">Date</th>
                <th className="dash-th">Created links Counts</th>
              </tr>
              {dailyLinks.map((val, ind)=>(
                <tr className="dash-tr">
                  <td className="dash-td">{val._id}</td>
                  <td className="dash-td">{val.count}</td>
                </tr>
              ))}
            </table>
          </div>:
          <div className="daily-links-div">
          <table className="dash-table">
            <tr className="dash-tr">
              <th className="dash-th">Year-Month</th>
              <th className="dash-th">Created links Counts</th>
            </tr>
            {monthlyLinks.map((val, ind)=>(
              <tr className="dash-tr">
                <td className="dash-td">{val._id}</td>
                <td className="dash-td">{val.count}</td>
              </tr>
            ))}
          </table>
        </div>}          
        </Base>
      </div>
    </div>
  )
}
export default GetCounts;