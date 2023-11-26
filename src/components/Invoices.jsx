import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Table,
  Badge,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import {
  BsFillEyeFill,
  BsTrash,
  BsPencil,
  BsDownload,
} from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from './Navbar';
import AddIcon from '@mui/icons-material/Add';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import '../styles/Invoices.css';
import { Link } from 'react-router-dom';

const InvoicePopup = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [invoiceId, setInvoiceId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [invoiceData, setInvoiceData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const courses = [
    { id: 1, name: 'FULL STACK', amount: 5000 },
    { id: 2, name: 'JAVASCRIPT', amount: 3000 },
    { id: 3, name: 'FRONTEND', amount: 2000 },
  ];

  const handleClose = () => {
    resetForm();
    setShowModal(false);
  };

  const handleShow = () => {
    generateInvoiceId();
    if (selectedInvoice) {
      setName(selectedInvoice.name);
      setEmail(selectedInvoice.email);
      setAddress(selectedInvoice.address);
      setSelectedCourses(selectedInvoice.selectedCourses);
      setAmountPaid(selectedInvoice.amountPaid);
      setSelectedDate(new Date(selectedInvoice.date));
    }
  
    setShowModal(true);
  };

  const handleDropdownChange = (e) => {
    const courseId = parseInt(e.target.value, 10);
    const selectedCourse = courses.find((course) => course.id === courseId);

    if (selectedCourse) {
      setSelectedCourses((prevSelected) => [...prevSelected, selectedCourse]);
    }
  };

  const handleDeleteCourse = (courseId) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.filter((course) => course.id !== courseId)
    );
  };

  const calculateTotalAmount = () => {
    return selectedCourses.reduce((total, course) => total + course.amount, 0);
  };

  const calculateRemainingAmount = () => {
    return calculateTotalAmount() - amountPaid;
  };

  const handlePaymentStatus = () => {
    const remainingAmount = calculateRemainingAmount();

    if (amountPaid <= 0) {
      return <Badge bg="danger">Unpaid</Badge>;
    } else if (remainingAmount === 0) {
      return <Badge bg="success">Paid</Badge>;
    } else {
      return (
        <Badge bg="warning">
          Partially Paid (Remaining: Rs: {remainingAmount})
        </Badge>
      );
    }
  };

  const handlePaymentSubmit = () => {
    if (!name || !email || !address || selectedCourses.length === 0) {
      alert('Please fill in all details before submitting.');
      return;
   
    }
   

    const updatedInvoice = {
      name,
      email,
      address,
      invoiceId,
      date: selectedDate.toLocaleDateString(),
      selectedCourses,
      amountPaid,
      totalAmount: calculateTotalAmount(),
      paymentStatus: handlePaymentStatus(),
    };
    // const res = await fetch(
    //   "http://127.0.0.1:8000/api/user/update/",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(updatedInvoice),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //       Authorization: "Basic " + btoa("admin:admin"),
    //     },
    //   }

    // const data = await res.json();
    // )

    if (selectedInvoice) {
      // Update existing invoice
      const updatedData = invoiceData.map((invoice) =>
        invoice.invoiceId === selectedInvoice.invoiceId ? updatedInvoice : invoice
      );
      setInvoiceData(updatedData);
    } else {
      // Add new invoice
      setInvoiceData((prevData) => [...prevData, updatedInvoice]);
    }

    localStorage.setItem('invoiceData', JSON.stringify([...invoiceData, updatedInvoice]));

    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setAddress('');
    setSelectedCourses([]);
    setAmountPaid(0);
    setSelectedInvoice(null);
  };

  const generateInvoiceId = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (`0${currentDate.getMonth() + 1}`).slice(-2);
    const day = (`0${currentDate.getDate()}`).slice(-2);

    // Incrementing the 4-digit number for each invoice
    const lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber'), 10) || 0;
    const newInvoiceNumber = (lastInvoiceNumber + 1).toString().padStart(3, '0');
    localStorage.setItem('lastInvoiceNumber', newInvoiceNumber);

    setInvoiceId(`${year}CBINV${month}${day}${newInvoiceNumber}`);
  };

  useEffect(() => {
    // You can perform any additional logic here when the component mounts
    // const storedInvoiceData = JSON.parse(localStorage.getItem('invoiceData')) || [];
    // setInvoiceData(storedInvoiceData);
  }, []);

  const handleView = (invoiceId) => {
    // Add logic to handle the view action
    console.log('View Invoice:', invoiceId);
  };

  const handleEdit = (invoiceId) => {
    const selected = invoiceData.find((invoice) => invoice.invoiceId === invoiceId);
    setSelectedInvoice(selected);
    handleShow();
  };

  const handleDelete = (invoiceId) => {
    // Find the index of the item to delete
    const indexToDelete = invoiceData.findIndex((invoice) => invoice.id === invoiceId);

    // Create a new array without the item to delete
    const updatedItems = [...invoiceData.slice(0, indexToDelete), ...invoiceData.slice(indexToDelete + 1)];

    // Update the items state
    setInvoiceData(updatedItems);
  };

  const handleDownload = (invoiceId) => {
    // Add logic to handle the download action
    console.log('Download Invoice:', invoiceId);
  };

  return (
    <div>
      <Navbar />
      <div className='topic'>
        <h1>Invoices</h1>
        <hr className='line'></hr>
        <Button className='btn1' variant="primary" onClick={handleShow}>
          <AddIcon />
          Create Invoice
        </Button>
        {/* <a href="./components/Home.jsx" target="_blank" rel="noopener noreferrer"/> */}
        <Link to="/invoice1">
        {/* <a href="./path/to/invoice1.html" target="_blank" rel="noopener noreferrer"> */}
        <Button className='btn2' variant="primary">
          <SpeakerNotesIcon />
          View Invoice
        </Button>
        </Link>
      
  {/* <Button className='btn2' variant="primary" href="./Home.jsx">
    <SpeakerNotesIcon />
    View Invoice
  </Button> */}


        <br></br>
        <br></br>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedInvoice ? 'Edit Invoice' : 'Create Invoice'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="invoiceId">
                <Form.Label>Invoice ID</Form.Label>
                <Form.Control type="text" value={invoiceId} readOnly />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.Label>Select Date</Form.Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </Form.Group>

              <Form.Group controlId="courseDropdown">
                <Form.Label>Select Courses:</Form.Label>
                <Form.Select onChange={handleDropdownChange} multiple>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} - Rs: {course.amount}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCourses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.name}</td>
                      <td>Rs: {course.amount}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <strong>Total Amount: Rs: {calculateTotalAmount()}</strong>
              <Form>
                <Form.Group controlId="amountPaid">
                  <Form.Label>Amount Paid:</Form.Label>
                  <Form.Control
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                  />
                </Form.Group>
                <div>{handlePaymentStatus()}</div>
              </Form>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePaymentSubmit}>
              {/* Submit Payment */}
              {selectedInvoice ? 'Update Invoice' : 'Submit Payment'}
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#Invoice Number</th>
              <th>Invoice Date</th>
              <th>Customer Name</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.date}</td>
                <td>{invoice.name}</td>
                <td>{invoice.paymentStatus}</td>
                <td>
                  <OverlayTrigger
                    overlay={<Tooltip id={`view-tooltip-${invoice.id}`}>View</Tooltip>}
                  >
                    <Button variant="info" onClick={() => handleView(invoice.id)}>
                      <BsFillEyeFill />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    overlay={<Tooltip id={`edit-tooltip-${invoice.id}`}>Edit</Tooltip>}
                  >
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(invoice.id)}
                    >
                      <BsPencil />
                    </Button>
                  </OverlayTrigger>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    <BsTrash />
                  </Button>

                  <OverlayTrigger
                    overlay={<Tooltip id={`download-tooltip-${invoice.id}`}>Download</Tooltip>}
                  >
                    <Button
                      variant="success"
                      onClick={() => handleDownload(invoice.id)}
                    >
                      <BsDownload />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default InvoicePopup;
