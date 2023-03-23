import axios from "axios";
import React, { useEffect, useState } from "react";
import "../SocietyModule/Guardlist.css";
import LogOut from './Utils/LogOut'
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { reloadInOneSec, TOAST } from "../../common/utils";
import { ToastMessage } from "../ToastMessage";
import Societyheader from "./Utils/Societyheader";


const ChecklistCommunityStaff = () => {
    const [Guards, setGuards] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [currentPosts, setCurrentPosts] = useState([])
    const [toast, setToast] = useState({ show: false })

    const navigate = useNavigate()

    useEffect(() => {
        getGuardDetails()
    }, [])

    const getGuardDetails = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/societystaff/getall/${localStorage.getItem("community_id")}`)
            setGuards(data.data.Society_staff)
            const indexoflast = currentPage * postPerPage  //endoffset
            const indexoffirst = indexoflast - postPerPage //startoffset
            setCurrentPosts(data.data.Society_staff.slice(indexoffirst, indexoflast))
        } catch (error) {
            console.log(error)
        }
    }

    async function paginate(event) {
        setCurrentpage(event.selected + 1)
        const indexoflast = (event.selected + 1) * postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startoffset
        setCurrentPosts(Guards.slice(indexoffirst, indexoflast))
    }

    function guardDetails(item) {
        console.log(item);
        navigate('/add-community-staff-checklist', { state: { data: item, type: 'edit', id: item._id } })
    }

    async function handelRemoveClick(item) {
        const sendData = { id: item.id };
        const { data } = await axios.post(`${window.env_var}api/societystaff/delete`, sendData)
        if (data.status_code == 200) {
            setToast(TOAST.SUCCESS(data?.message));
            reloadInOneSec()
        } else {
            setToast(TOAST.ERROR(data?.message));
        }
    }


    const findText = (e) => {
        let search = e.target.value.toLowerCase()
        //console.log(search)
        let arr = Guards.filter(x => {
            //console.log(Guards)
            if (x.name.toLowerCase().includes(search)) {
                return true
            }
            else if (x.name.toLowerCase().includes(search)) {
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
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <div id="addflatsection">
                <Societyheader />


            </div>
            <div id="societynamesection">

                <div className="GL_societyname">
                    <img src="/images/societyicon.svg" alt="Society image" />
                    <label>Society Name</label>
                </div>

                <div className='GLsidelinks pl-5'>
                    <p className='noticegll float-left' onClick={() => navigate('/community-staff-checklist-report')}><b>Reports</b></p>
                    <p className='noticegll float-left' onClick={() => navigate('/add-community-staff-checklist')}><b>Add Staff </b></p>
                    <p className='aggnotice float-left' onClick={() => navigate('/community-staff-checklist')}><b>Society Staff</b></p>
                </div>

                <div className="GLSimg">
                    <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
                </div>

            </div>
            <div className="addguestbackgroundimg">
                <div className='GL_display'>
                    <label>Society Staff Checklist</label>
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
                            <th class="th-sm">Contact</th>
                            <th class="th-sm">Service</th>
                            <th class="th-sm">Status</th>
                            <th class="th-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((item, index) => {

                            return (

                                <tr>
                                    <td>{(currentPage - 1) * postPerPage + (index + 1)}</td>
                                    <td >{item.name}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.service_name}</td>
                                    <td>{item.status == false ? 'Inactive' : 'Active'}</td>
                                    <td><div>
                                        <IconButton onClick={() => { guardDetails(item) }}>
                                            <img src="/images/icon_edit.svg" />
                                        </IconButton>

                                        <IconButton onClick={() => handelRemoveClick(item)}>
                                            <img src="/images/icon_delete.svg" />
                                        </IconButton>

                                    </div></td>
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

export default ChecklistCommunityStaff;
