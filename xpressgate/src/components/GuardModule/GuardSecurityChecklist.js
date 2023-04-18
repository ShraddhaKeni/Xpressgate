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
import GuardHeader from './Utils/GuardHeader';
import GuardMobileSidebar from '../GuardMobileSidebar';
import Table from 'react-bootstrap/Table';
const GuardSecurityChecklist = () => {
    const [Checklist, setChecklist] = useState([])
    const [currentPage, setCurrentpage] = useState(0)
    const [postPerPage, setPostPerPage] = useState(10)
    const [currentPosts, setCurrentPosts] = useState([])
    const [toast, setToast] = useState({ show: false })
    const [menu, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getGuardDetails()
    }, [])

    const getGuardDetails = async () => {
        try {
            const sendData = {
                // community_id: '632970d054edb049bcd0f0b4',
                community_id: localStorage.getItem('community_id'),
                for : '643d109268fc88d397db5c5a'
              }
            const { data } = await axios.post(`${window.env_var}api/checklist/gettypechecklist`, sendData)
            console.log(data.data)
            setChecklist(data.data.Checklist_Details)
            const indexoflast = (currentPage + 1 ) * postPerPage  //endoffset
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

//     async function findText(e) {
//         console.log(Checklist)
//         let text = Checklist.filter(x => x.item?.toLowerCase().includes(e.target.value.toLowerCase()))
//         if(text)
//     {
//       const indexoflast = (currentPage + 1 ) * postPerPage   //endoffset
//       const indexoffirst = (indexoflast - postPerPage)
//       setCurrentPosts(text.slice(indexoffirst,indexoflast))
//     }
//     else
//     {
//       paginate(0)
//     }
//   }




    return (
        <div className="addguestcontainer4">
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <div id="addflatsection">
            <GuardHeader onMenuClick={() => {
          setMenuOpen(true)
        }} />


            </div>
            <div id="societynamesection">
                <div className="GL_societyname">
                    <img src="/images/guardnameicon.svg" alt="Guard image" />
                    <label>{localStorage.getItem('name')}</label>
                </div>


                <div className='GuestLsideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
            </div>
            <div className='flex-1 d-flex' style={{ width: "100%", height: '100%' }}>
            <div className='new-main-container'>
            <main>
            <div className='GuestL_display'>
                  <label>Security Checklist</label>
                </div>
               
           {/* <div className='row'>
            <div className='mtsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input className='vlsearch_input' placeholder='Search' onChange={(e) => findText(e)}></input></span>
            </div>
          </div> */}
          <div>
                <Table id="InoutBooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }} size='sm' responsive>
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
                                     <td>{index + 1 + (currentPage * postPerPage)}</td>
                                    <td >{item.item}</td>
                                    <td>{item.frequency == '1' ? 'Daily' :item.frequency == '2' ? 'Monthly' :item.frequency  == '3' ? 'Quarterly' : item.frequency  == '4' ? 'Half-yearly ' : item.frequency  == '5' ?  'Yearly' : ' - ' } </td>
                                    <td>{item.other_details}</td>
                                    <td><div>
                                   
                            <button className='MarkCompleteButn'>Mark Complete</button>
                      
                                        {/* <IconButton onClick={() => { handleEditClick(item) }}>
                                            <img src="/images/icon_edit.svg" />
                                        </IconButton>

                                        <IconButton onClick={() => handelRemoveClick(item)}>
                                            <img src="/images/icon_delete.svg" />
                                        </IconButton> */}

                                    </div></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </div>
                <PaginationCalculate totalPages={Checklist.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
                </main>
            </div>
            </div>
            <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />
        </div>
    );
};

export default GuardSecurityChecklist;
