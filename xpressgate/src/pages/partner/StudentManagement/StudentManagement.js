import React, { useEffect, useState } from 'react';
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ButtonBase, Icon, IconButton } from '@mui/material';
import { deleteStudents } from '../../../common/partner/partner_api';
import { Loader } from '../../../components/Loader';
import { ToastMessage } from '../../../components/ToastMessage';
function StudentManagement() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false })

  const [student, setStudents] = useState([])
  const [currentPage, setCurrentpage] = useState(0)
  const [postPerPage, setPostPerPage] = useState(10)
  const [currentPosts, setCurrentPosts] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      getStudents()
  }, [])

  const getStudents = async () => {
      try {
          const { data } = await axios.get(`${window.env_var}api/partner/students`)
          setStudents(data.data)
          const indexoflast = (currentPage + 1) * postPerPage  //endoffset
          const indexoffirst = (indexoflast - postPerPage) //startoffset
          console.log(data.data);
          setCurrentPosts(data.data.slice(indexoffirst, indexoflast))
          setLoading(false);
      } catch (error) {

      }
  }
  async function paginate(event) {

      setCurrentpage(event.selected)
      const indexoflast = (event.selected + 1) * postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage) //startoffset
      setCurrentPosts(student.slice(indexoffirst, indexoflast))
  }
  function ViewStudentDetails(id)
  {
    navigate('/partner/student/studentdetails',{state:{student:id,type:'edit'}})
  }
   
  const handleDelete = async (id) => {
   
    // const sendData = {
  
    //   id: id

    // }
    try {
      // console.log(sendData)
     
      const {data}=await axios.delete(`${window.env_var}api/partner/students/${id}`);
      console.log(data)
      setToast({ show: true, message: "Deleted Successfully", type: "success" })
      
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }
  const handleEditClick = (id) => {

      navigate('/partner/student/editstudent', { state: { id } })
  }

  async function findText(e) {
      let text = student.filter(x => x.name?.toLowerCase().includes(e.target.value.toLowerCase()))
      if (text) {
          setCurrentPosts(text)
      }
      else {
          await paginate(0)
      }

  }

    return (
        <>
          <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div>
        <div className='page-label'>
          <label>Enrolled Member List</label>
        </div>
        <div>
          <div className="table-top-right-content">
            <div className='CNameSelectButn'>
              <select id="Course_name" name="course_name">
                <option value=" " disabled selected>Program Name</option>
                <option value=" "></option>
                <option value=" "></option>
              </select>
            </div>
            <div className="table-srch pl-2">
              <span>
                <img src="/images/vendorlistsearch.svg" alt="search icon"></img>
              </span>
              <span>
                <input className="search" placeholder="Search" onChange={(e) => { findText(e) }}/>
              </span>
            </div>
            <div className="table-add-new-butn" onClick={() => { window.location.href = '/partner/student/addstudent' }}>
              <span className="ml-2">&#43; Add New Member</span>
            </div>
          </div>
        </div>
        <br/>
        <table id="table-header" class="table table-striped table-bordered table-sm " cellspacing="0">
                            <thead className='table-th'>
                                <tr>
                                    <th class="th-sm" >Sr.No.</th>
                                    <th class="th-sm" >Member Name</th>
                                    <th class="th-sm">Phone Number</th>
                                    <th class="th-sm">Email</th>
                                    <th class="th-sm">View Details</th>
                                    <th class="th-sm">Status</th>
                                    <th class="th-sm">Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {currentPosts.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1 + (currentPage * postPerPage)}</td>
                                            <td> {item.name} </td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <div>
                                                    <button className='AddPButn' onClick={() => {ViewStudentDetails(item._id) }}  >View</button>
                                                </div>
                                            </td>
                                            <td>{item.status==false?'Inactive':'Active'}</td>
                                            <td>
                                                <div>
                                                    <IconButton onClick={() => { handleEditClick(item._id) }}>
                                                        <img src="/images/icon_edit.svg" />
                                                    </IconButton>

                                                    <IconButton onClick={(e) => { e.preventDefault(); handleDelete(item._id) }}>
                                                        <img src="/images/icon_delete.svg" />
                                                    </IconButton>

                                                </div>
                                            </td>
                                           
                                        </tr>
                                 )
                                })}
                               


                            </tbody>
                        </table>
                        {student.length > postPerPage && <div className='paginate'>
                            <PaginationCalculate totalPages={student.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
                        </div>}
          </div>
       </>
    )
}

export default StudentManagement