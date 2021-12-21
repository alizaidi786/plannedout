import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LongTerm.css'
import { Modal,Button,Col,Row,Form } from 'react-bootstrap'
import Axios from "../../Axios";

export default function LongTermEditModal(props) { 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [shortTerm, setShortTerm] = useState([]);
    const [shortTerms, setShortTerms] = useState([]);

    const handleSelect = function(selectedItems) {
      const shortTermIds = [];
      for (let i=0; i<selectedItems.length; i++) {
          shortTermIds.push(selectedItems[i].value);
      }
      setShortTerm(shortTermIds);
  }
  useEffect(() => {
    Axios.get(`http://localhost:4000/shortTerm`).then(
      (data) => {
        if (data.data.body.status == "SUCCESS") {
          setShortTerms(data.data.body.data);
        } else if (data.data.body.status == "ERROR") {

        }
      }
    )
  }, [shortTerms])

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
        if(shortTerm.length == 0){
          var shortTermEdited = props.shortTerm
        }else{
          shortTermEdited = shortTerm
        }
        console.log("Enter");
        Axios.post("http://localhost:4000/longTerm", {
          id: props._id,
          title: titleEdited,
          description: descriptionEdited,
          startDate: startDateEdited,
          finishDate: finishDateEdited,
          shortTerm: shortTermEdited
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
           Edit Long Term Goal
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

 <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Control as="select" multiple={true} onChange={(e)=> {handleSelect(e.target.selectedOptions)}}>
      <option >Select Short Terms (Optional- Press Ctrl and then select multiple values)</option>
      {shortTerms.map((shortterms) =>(
        <option value={shortterms._id}>{shortterms.title}</option>
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
