import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../SocietyModule/Guardlist.css";
import LogOut from './Utils/LogOut'
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useNavigate } from "react-router-dom";


const CheckListMaintenanceReport = () => {
    const [Guards, setGuards] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [currentPosts, setCurrentPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGuardDetails()
    }, [])

    const getGuardDetails = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/guard/getall`)
            setGuards(data.data.Guards)
            const indexoflast = currentPage * postPerPage  //endoffset
            const indexoffirst = indexoflast - postPerPage //startoffset
            setCurrentPosts(data.data.Guards.slice(indexoffirst, indexoflast))
        } catch (error) {
            console.log(error)
        }
    }

    async function paginate(event) {
        const { data } = await axios.get(`${window.env_var}api/guard/getall`)
        setCurrentpage(event.selected + 1)
        const indexoflast = (event.selected + 1) * postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startoffset
        setCurrentPosts(data.data.Guards.slice(indexoffirst, indexoflast))
    }

    function guardDetails(id) {
        navigate('/addGuard', { state: { id: id, type: 'edit' } })
    }

    const findText = (e) => {
        let search = e.target.value.toLowerCase()
        //console.log(search)
        let arr = Guards.filter(x => {
            //console.log(Guards)
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
                    <p className='aggnotice float-left' onClick={() => navigate('/maintenance-checklist-report')}><b>Reports</b></p>
                    <p className='noticegll float-left' onClick={() => navigate('/add-maintenance-checklist')}><b>Add Checklist</b></p>
                    <p className='noticegll float-left' onClick={() => navigate('/maintenance-checklist')}><b>Checklists</b></p>
                </div>
                <div className="GLSimg">
                    <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
                </div>
            </div>
            <div className="addguestbackgroundimg">
                <div className='GL_display'>
                    <label>Maintenance Cheklist</label>
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
                            <th class="th-sm">Guard Name</th>
                            <th class="th-sm">Phone</th>
                            <th class="th-sm">Email</th>
                            <th class="th-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((item, index) => {

                            return (

                                <tr onClick={() => guardDetails(item.id)}>
                                    <td>{currentPage <= 2 ? (currentPage - 1) * 12 + (index + 1) : (currentPage - 1 + 1) + (index + 1)}</td>
                                    <td >{item.firstname} {item.lastname}</td>
                                    <td>{item.mobileno}</td>
                                    <td>{item.email}</td>
                                    <td>{item.status == false ? 'Inactive' : 'Active'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <PaginationCalculate totalPages={Guards.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>
    );
};

export default CheckListMaintenanceReport;
