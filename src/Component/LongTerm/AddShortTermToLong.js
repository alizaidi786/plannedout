import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ShortTerm/ShortTerm.css'
import { Modal,Button,Col,Row,Form } from 'react-bootstrap'
import Axios from "../../Axios";

export default function AddShortTermToLong(props) { 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [longTerms, setLongTerms] = useState([]); 
    const [longTerm, setLongTerm] = useState([]); 
    const [longTermId, setLongTermId] = useState("");


    
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.put("http://localhost:4000/shortTerm", {
      title: title,
      description: description,
      startDate: startDate,
      finishDate: finishDate,
      longTerm: props.longTermId
    }).then((data) => {
      if (data.status == 200) {
        alert("Added Succesfully");
        this.props.onPopupClose(false); 
      } else if (data.status == 400) {
        alert("Server Down Try again after sometime");
      }
    });
        document.getElementById('close-view').click()
        
      };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        id="ShortTermEditPopUp"
        centered
      >
        <Modal.Header >
          <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
           Add Short Term Goal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>

<Form.Group className="mb-3" controlId="formGridAddress1">
   <Form.Label>Title</Form.Label>
   <Form.Control placeholder="Title"  onChange={(e) => setTitle(e.target.value)} defaultValue={props.title} />
 </Form.Group>

 <Form.Group className="mb-3" controlId="formGridAddress2">
   <Form.Label>Description</Form.Label>
   <Form.Control as="textarea" rows={3}   defaultValue={props.description}  onChange={(e) => setDescription(e.target.value)} />
 </Form.Group>    

 <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
    <Form.Label>Long Term Goal</Form.Label>
    <Form.Control disabled value={props.longTermTitle}/>
  </Form.Group>

 <Row className="mb-3">
   <Form.Group as={Col} controlId="formGridEmail">
     <Form.Label>Start Date</Form.Label>
     <Form.Control  type="date" defaultValue={props.startDate}   onChange={(e) => setStartDate(e.target.value)} />
   </Form.Group>

   <Form.Group as={Col} controlId="formGridPassword">
     <Form.Label>Finish Date</Form.Label>
     <Form.Control  type="date" defaultValue={props.finishDate}  onChange={(e) => setFinishDate(e.target.value)}/>
   </Form.Group>
 </Row>

 <Button type="submit" className="float-end submit-btn">
   Submit
 </Button>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="close-view" className="btn close-view" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
    }
