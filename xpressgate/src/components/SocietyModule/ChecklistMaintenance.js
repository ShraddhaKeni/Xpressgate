import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../SocietyModule/Guardlist.css";
import LogOut from './Utils/LogOut'
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";


const ChecklistMaintenance = () => {
    const [Checklist, setChecklist] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [currentPosts, setCurrentPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGuardDetails()
    }, [])

    const getGuardDetails = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/checklist/getall/${localStorage.getItem("community_id")}`)
            console.log(data.data)
            setChecklist(data.data.Checklist_Details)
            const indexoflast = currentPage * postPerPage  //endoffset
            const indexoffirst = indexoflast - postPerPage //startoffset
            setCurrentPosts(data.data.Checklist_Details.slice(indexoffirst, indexoflast))
        } catch (error) {
            console.log(error)
        }
    }

    async function paginate(event) {
        const { data } = await axios.get(`${window.env_var}api/guard/getall`)
        setCurrentpage(event.selected + 1)
        const indexoflast = (event.selected + 1) * postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startoffset
        setCurrentPosts(data.data.Checklist_Details.slice(indexoffirst, indexoflast))
    }

    const findText = (e) => {
        let search = e.target.value.toLowerCase()
        //console.log(search)
        let arr = Checklist.filter(x => {
            //console.log(Checklist)
            if (x.firstname.toLowerCase().includes(search)) {
                return true
            }
            else if (x.lastname.toLowerCase().includes(search)) {
                return true
            }
        })
        if (arr) {
            const indexoflast = currentPage * postPerPage  //endoffset
            const indexoffirst = (indexoflast - postPerPage)
            setCurrentPosts(arr.slice(indexoffirst, indexoflast))
        }
        else {
            paginate(0)
        }
    }

    const handleEditClick = (checklist) => {
        navigate('/add-maintenance-checklist', { state: { data: Checklist, type: 'edit', id: checklist.id } })
    }

    const handelRemoveClick = () => {

    }


    return (
        <div className="addguestcontainer4">
            <div id="addflatsection">
                <div className="addflatheadersection">
                    <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
                    <div id="afsociety"><label>Society</label></div>
                    <div id="afspace"></div>
                    <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
                    <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
                    <div id="aflogoutbutton"><LogOut /></div>
                </div>

            </div>
            <div id="societynamesection">
                <div className="GL_societyname">
                    <img src="/images/societyicon.svg" alt="Society image" />
                    <label>Society Name</label>
                </div>


                <div className='GLsidelinks pl-5'>
                    <p className='noticegll float-left' onClick={() => navigate('/security-checklist-report')}><b>Reports</b></p>
                    <p className='noticegll float-left' onClick={() => navigate('/add-security-checklist')}><b>Add Checklist</b></p>
                    <p className='aggnotice float-left' onClick={() => navigate('/security-checklist')}><b>Checklists</b></p>
                </div>
                <div className="GLSimg">
                    <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
                </div>
            </div>
            <div className="addguestbackgroundimg">
                <div className='GL_display'>
                    <label>Maintenance Checklist</label>
                </div>
                <div className='row'>
                    {/* <div className='search3'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='searchlabel'>Search</label><input className='search_input' onChange={(e)=>findText(e)} ></input></span>
          </div>
        </div> */}
                    <div className='GLsearchbox'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                            <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
                    </div>
                </div>
                <table id="guardlisttable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
                    <thead>
                        <tr>
                            <th class="th-sm">Sr No. </th>
                            <th class="th-sm">Name</th>

                            <th class="th-sm">Frequency</th>
                            <th class="th-sm">Notes</th>
                            <th class="th-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((item, index) => {

                            return (

                                <tr>
                                    <td>{currentPage <= 2 ? (currentPage - 1) * 12 + (index + 1) : (currentPage - 1 + 1) + (index + 1)}</td>
                                    <td >{item.item}</td>
                                    <td>{item.frequency}</td>
                                    <td>{item.other_details}</td>
                                    <td><div>
                                        <IconButton onClick={() => { handleEditClick(item) }}>
                                            <img src="/images/icon_edit.svg" />
                                        </IconButton>

                                        {/* <IconButton onClick={() => handelRemoveClick(item.id)}>
                                            <img src="/images/icon_delete.svg" />
                                        </IconButton> */}

                                    </div></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <PaginationCalculate totalPages={Checklist.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>
    );
};

export default ChecklistMaintenance;
