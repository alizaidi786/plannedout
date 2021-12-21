import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShortTerm.css'
import { Modal,Button,Col,Row,Form } from 'react-bootstrap'
import Axios from "../../Axios";

export default function ShortTermEditModal(props) { 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [longTermTitle, setLongTermTitle] = useState(""); 
    const [longTerms, setLongTerms] = useState([]); 
    const [longTerm, setLongTerm] = useState([]); 
    const [longTermId, setLongTermId] = useState("");

    useEffect(() => {
      Axios.get(`http://localhost:4000/longTerm?id=${props.longTerm}`).then(
        (data) => {
          if (data.data.body.status == "SUCCESS") {
            setLongTerm(data.data.body.data);
          } else if (data.data.body.status == "ERROR") {
          }
        }
      );
    }, [longTerm] )


    useEffect(() => {
      Axios.get(`http://localhost:4000/longTerm`).then(
        (data) => {
          if (data.data.body.status == "SUCCESS") {
            setLongTerms(data.data.body.data);
          } else if (data.data.body.status == "ERROR") {

          }
        }
      )
    }, [longTerms])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        if(title.length == 0){
          var titleEdited = props.title
        }else{
          titleEdited = title
        }
        if(description.length == 0){
          var descriptionEdited = props.description
        }else{
          descriptionEdited = description
        }
        if(startDate.length == 0){
          var startDateEdited = props.startDate
        }else{
          startDateEdited = startDate
        }
        if(finishDate.length == 0){
          var finishDateEdited = props.finishDate
        }else{
          finishDateEdited = finishDate
        }
        
        console.log("Enter");
        Axios.post("http://localhost:4000/shortTerm", {
          id: props._id,
          title: titleEdited,
          description: descriptionEdited,
          startDate: startDateEdited,
          finishDate: finishDateEdited,
          longTerm: longTermId
        }).then((data) => {
          if (data.status == 200) {
            console.log(data.data.body.data);
            alert("Updated Succesfully");
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
           Edit Short Term Goal
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
    <Form.Control as="select" value={longTerm.title} onChange={(e) => setLongTermId(e.target.value)} >
      <option>Select Long Term (Optional)</option>
      {longTerms.map((longterms) =>(
        <option value={longterms._id}>{longterms.title}</option>
      ) )
      }
      
    </Form.Control>
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
