import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadDataAPI } from '../services/allAPI';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const Add = ({ setUploadDataResponse }) => {
  const [employeeDetails, setEmployeeDetails] = useState({
    id: "", name: "", email: "", status: ""
  })

  console.log(employeeDetails);





  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateName = (name) => {
    const re = /^[A-Za-z]+$/; // Only letters
    return name.trim().length >= 2 && re.test(name);
  };


  const handleAdd = async () => {

    console.log('Add button clicked');
    const { name, email, status } = employeeDetails


    if (!name || !email || !status) {
      toast.warning("Please fill the form completely");
      return;
    }

    if (!validateName(name)) {
      toast.warning("Name must be at least 2 characters long and contain only letters");
      return;
    }

    if (!validateEmail(email)) {
      toast.warning("Please enter a valid email address");
      return;
    }


    const result = await uploadDataAPI(employeeDetails)
    console.log(result);
    if (result.status >= 200 && result.status < 300) {
      handleClose()
      setEmployeeDetails({ name: "", email: "", status: "" })
      toast.success("Employee details added successfully")
      setUploadDataResponse(result)
    }
  }



  return (
    <>
      <div className='d-flex ms-auto align-items-center'>
        <button onClick={handleShow} className='btn btn-success ms-3 fs-5  my-2'>Add Employee</button>
      </div>


      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
            <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-3" >
              <Form.Control type="text" placeholder="Username" onChange={e => setEmployeeDetails({ ...employeeDetails, name: e.target.value })} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3" >
              <Form.Control type="text" placeholder="Email" onChange={e => setEmployeeDetails({ ...employeeDetails, email: e.target.value })} />
            </FloatingLabel>
            <FormControl className="mt-3 w-100">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employeeDetails.status}
                name='status'
                label="Status"
                onChange={e => setEmployeeDetails({ ...employeeDetails, status: e.target.value })}
                className='w-100'
              >
                <MenuItem value="" disabled>Select Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>n
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-warning' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} className='btn btn-success'>Add</Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Add