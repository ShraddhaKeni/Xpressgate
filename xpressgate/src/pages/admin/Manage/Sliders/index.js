import React, { useEffect, useState } from 'react';
import { ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Icon, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';
import RouterPath from '../../../../common/constants/path/routerPath';
import { Button, Modal } from 'react-bootstrap';
import { DOMAIN } from '../../../../common/axios_client';
import { deleteSlider, getAllSliders } from '../../../../common/admin/admin_api';

const Sliders = () => {

    const navigate = useNavigate();


    const [preview, setPreview] = useState();
    const [upload, setUpload] = useState();
    const [uploadFile, setUploadFile] = useState();

    const [sliders, setSliders] = useState([])
    const [currentPage, setCurrentpage] = useState(0)
    const [postPerPage] = useState(5)
    const [currentPosts, setCurrentPosts] = useState([])

    useEffect(() => {
        getSliders()
    }, [])

    const getSliders = async () => {
        try {
            const { data } = await getAllSliders();
            setSliders(data.data.sliders)
            const indexoflast = (currentPage + 1) * postPerPage  //endoffset
            const indexoffirst = (indexoflast - postPerPage) //startoffset
            console.log(data.data);
            setCurrentPosts(data.data.sliders.slice(indexoffirst, indexoflast))
        } catch (error) {
            console.log(error)
        }
    }
    async function paginate(event) {

        setCurrentpage(event.selected)
        const indexoflast = (event.selected + 1) * postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startoffset
        setCurrentPosts(sliders.slice(indexoffirst, indexoflast))
    }

    const removeGateway = async (id) => {
        await deleteSlider(id);
        window.location.reload();
    }

    const handleAddSliders = () => {
        setUpload(true);
    }

    const handleImageSelection = (e) => {

        setUploadFile(e.target.files[0])
        console.log(e.target.files[0]);
        setPreview(true);
        setUpload(false);

    }


    console.log(uploadFile);


    const handleImageUpload = async () => {
        if (uploadFile) {
            try {
                const formData = new FormData();
                formData.append('slider_pic', uploadFile);
                formData.append('status', 1);
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                const { data } = await axios.post(`${window.env_var}api/slider/add`, formData, config);
                window.location.reload();
            } catch (error) {
                alert(error);
            }
        }
    }


    async function findText(e) {
        let text = sliders.filter(x => x.gateway_name.toLowerCase().includes(e.target.value.toLowerCase()))
        if (text) {
            setCurrentPosts(text)
        }
        else {
            await paginate(0)
        }

    }

    return (
        <>
            <img src='/images/side_bar_img.svg' className='Premise_side_Img' />
            <div>
                <div className='page-label'>
                    <label>Manage Sliders</label>
                </div>
                <div>
                    <div className='table-top-right-content'>

                        <div className="table-add-new-button" onClick={handleAddSliders}>

                            <span className='ml-2'>&#43; Add New Slider</span>
                        </div>
                    </div>

                    <table id="table-header" class="table table-striped table-bordered table-sm " cellspacing="0">
                        <thead className='table-th'>
                            <tr>
                                <th class="th-sm" >ID No.</th>
                                <th class="th-sm">Slider</th>
                                <th class="th-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1 + (currentPage * postPerPage)}</td>
                                        <td><img style={{ width: '80px;', height: '60px' }} src={DOMAIN + item.slider_pic} /></td>
                                        <td>
                                            <div>
                                                {/* <IconButton onClick={() => { handleEditClick(item.id) }}>
                                                    <img src="/images/icon_edit.svg" />
                                                </IconButton> */}

                                                <IconButton onClick={() => removeGateway(item.id)}>
                                                    <img src="/images/icon_delete.svg" />
                                                </IconButton>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                    {sliders.length > postPerPage && <div className='paginate'>
                        <PaginationCalculate totalPages={sliders.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
                    </div>}
                </div >


                <Dialog
                    open={upload}
                    onClose={() => { setUpload(false); }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Choose an Image to upload"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please select only image files.
                        </DialogContentText>
                        <input type={'file'} placeholder={'Choose'} onChange={handleImageSelection} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setUpload(false) }}>Go Back</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={preview}
                    onClose={() => { }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to upload this Image?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                        </DialogContentText>
                        {uploadFile && <img style={{ maxHeight: '640px', maxWidth: '640px' }} src={URL.createObjectURL(uploadFile)} />}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setUpload(true); setPreview("") }}>Cancel</Button>
                        <Button onClick={handleImageUpload} autoFocus>
                            Upload
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >

        </>)
}

export default Sliders

