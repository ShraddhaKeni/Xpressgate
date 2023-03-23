import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../SocietyModule/Guardlist.css";
import LogOut from './Utils/LogOut'
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ToastMessage } from "../ToastMessage";
import { reloadInOneSec, TOAST } from "../../common/utils";
import Societyheader from "./Utils/Societyheader";


const ChecklistSecurity = () => {
    const [Checklist, setChecklist] = useState([])
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
        // const { data } = await axios.get(`${window.env_var}api/guard/getall`)
        setCurrentpage(event.selected + 1)
        const indexoflast = (event.selected + 1) * postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startoffset
        setCurrentPosts(Checklist.slice(indexoffirst, indexoflast))
    }

    const findText = (e) => {
        let search = e.target.value.toLowerCase()
        //console.log(search)
        let arr = Checklist.filter(x => {
            //console.log(Guards)
            if (x.item.toLowerCase().includes(search)) {
                return true
            }
            else if (x.item.toLowerCase().includes(search)) {
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
        navigate('/add-security-checklist', { state: { data: Checklist, type: 'edit', id: checklist.id } })
    }

    async function handelRemoveClick(item) {
        const sendData = { id: item.id };
        const { data } = await axios.post(`${window.env_var}api/checklist/remove`, sendData)
        if (data.status_code == 403) {
            reloadInOneSec()
            setToast(TOAST.SUCCESS(data?.message));

        } else {
            setToast(TOAST.ERROR(data?.message));
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
                    <label>Security Checklist</label>
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
                                    <td>{(currentPage - 1) * postPerPage + (index + 1)}</td>
                                    <td >{item.item}</td>
                                    <td>{item.frequency}</td>
                                    <td>{item.other_details}</td>
                                    <td><div>
                                        <IconButton onClick={() => { handleEditClick(item) }}>
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
                <PaginationCalculate totalPages={Checklist.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>
    );
};

export default ChecklistSecurity;
