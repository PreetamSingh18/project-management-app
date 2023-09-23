import { faClose, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import SideMenu from "./component/SideMenu";

const App = () => {
  const [Count,setCount]=useState({
    Ocnt:0,
    Icnt:0,
    Ccnt:0,
  });
  const [dummy,setDummy]=useState(0);
  const [cnt1,setCnt1]=useState(0);
  const [cnt2,setCnt2]=useState(0);
  const [cnt3,setCnt3]=useState(0);
  const [formBtn, setFormBtn] = useState(true);
  const [Editbtn, setEditBtn] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [data, setData] = useState([]);
  const [EntryData, setEntryData] = useState({
    ProjectName: "",
    EmployeeName: "",
    Status:"",
  });
  const handleId = (e, ind, val) => {
    console.log(ind);
    setUpdateIndex(ind);
    setEntryData(val);
    setEditBtn(true);
    setFormBtn(!formBtn);
  };

  const handleClose = () => {
    setFormBtn(!formBtn);
  };

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEntryData({ ...EntryData, [name]: value });
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    data.map((val, ind) => {
      if (ind == updateIndex) {
        val.Status = EntryData.Status;
      }
      return val;
    });
    setDummy(dummy+1);
    if (EntryData.Status == "In Process") {
      document.getElementById(updateIndex).style.backgroundColor = "yellow";
    } else if (EntryData.Status == "Completed") {
      document.getElementById(updateIndex).style.backgroundColor = "#4BB543";
      // document.getElementById(`${updateIndex}-k`).di;
      console.log(`${updateIndex}-k`);
    } else if (EntryData.Status == "Open") {
      document.getElementById(updateIndex).style.backgroundColor = "#24a0ed";
    }
    setUpdateIndex(-1);
    setEntryData({
      ProjectName: "",
      EmployeeName: "",
      Status: "",
    });
    setEditBtn(false);
    alert("Task Updated");
   
    handleClose();
  };
  
  
  const handleCnt=()=>{
    data.map((val, ind) => {
      if(val.Status=="Open"){
        setCnt1(cnt1+1);
      }
      else if(val.Status=="In Process"){
        setCnt1(cnt1?cnt1-1:0);
        setCnt2(cnt2+1);
      }
      else if(val.Status=="Completed"){
        setCnt2(cnt2?cnt2-1:0);
        setCnt3(cnt3+1);
     
        // setEntryData({ ...EntryData, ["id"]: `${data.length}` });
      }
      return val;
    });
    // setCount({[]})
   
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (EntryData.ProjectName == "") {
      alert("Enter Project Name");
    } else if (EntryData.EmployeeName == "") {
      alert("Enter Employee Name");
    } else if (EntryData.Status == "") {
      alert("Set Status");
    } else {
      setData((data) => [...data, EntryData]);
      setDummy(dummy+1);
      setEntryData({
        ProjectName: "",
        EmployeeName: "",
        Status:"",
      });
      alert("New Project Assigned");
     
      handleClose();
      // console.log(data);
    }
  };

  useEffect(()=>{
    handleCnt();
    
  },[dummy]);
  return (
    <div className="main">
      <div className={!formBtn ? "showoverlay overlay" : "overlay"}></div>

      <div className="NavHead">
        <h3>Project Management App</h3>
      </div>
      <div className="Content-Box">
        <SideMenu />
        <div className="TaskContainer">
        <div className="Dashboard">
          <div className="Dashboard-Box1">
          <div className="proj">
            <h4>Projects</h4>
            <h6>{data.length}</h6>
          </div>
          <div className="proj-stus">
            <h6>Open : {cnt1}</h6>
            <h6>In Process : {cnt2}</h6>
            <h6>Completed : {cnt3}</h6>
          </div>
          </div>
          <div className="Dashboard-Box2">
            <h4>Employes</h4>
            <h6>{data.length}</h6>
          </div>
        </div>


          {data.length == 0 ? (
            <div className="Empty-Container">
              <p>
                No Projects Assigned to Employees,Click on + button on bottom Right of Screen .
              </p>
            </div>
          ) : (
            data.map((val, ind) => {
              return (
                <div key={ind} className="taskBox" id={ind}>
                  <div className="taskdetail">
                    <h2 className="detailhead">Employee Name</h2>
                    <h2 className="detail-name">{val.EmployeeName}</h2>
                  </div>
                  <div className="taskdetail">
                    <h2 className="detailhead">Project Assigned</h2>
                    <h2 className="detail-name">{val.ProjectName}</h2>
                  </div>
                  <div className="detail-option">
                    <h2 className="detail-status">{val.Status}</h2>
                    <FontAwesomeIcon
                      icon={faPen}
                      className="edit-icon"
                      id={`${ind}-k`}
                      onClick={(e) => {
                        handleId(e, ind, val);
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div
        className={
          formBtn ? "Form-Container" : "Form-Container Form-Container-Open"
        }
      >
        <div className="Close-Btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>

        <div className="Form-Box">
          <form>
            <div>
              <label htmlFor="ProjectName">Project Name : </label>
              <input
                name="ProjectName"
                type="text"
                value={EntryData.ProjectName}
                onChange={handleInput}
                required
                // {Editbtn==true? disabled:""}
                disabled={Editbtn}
              />
            </div>
            <div>
              <label htmlFor="EmployeeName">Assigned to : </label>
              <input
                name="EmployeeName"
                type="text"
                value={EntryData.EmployeeName}
                onChange={handleInput}
                required
                disabled={Editbtn}
              />
            </div>
            <div>
              <label htmlFor="Status">Status:</label>
              <select name="Status" onChange={handleInput}>
                <option value="" ></option>
                <option value="Open">Open</option>
                <option value="In Process" disabled={!Editbtn}>In Process</option>
                <option value="Completed" disabled={!Editbtn}>Completed</option>
              </select>
            </div>
            <div className="SaveBtn">
              <button
                onClick={
                  Editbtn ? (e) => handleEditSave(e) : (e) => handleSave(e)
                }
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="Plus" onClick={handleClose}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default App;
