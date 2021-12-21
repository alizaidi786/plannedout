import React, { Component, Fragment } from 'react';  
import { Modal, Form, Col, Button, Row } from 'react-bootstrap';  
import Axios from "../../Axios";
import "react-datepicker/dist/react-datepicker.css";
import { MdCancel } from 'react-icons/md';
import './ShortTerm.css'


  
class ShortTermModal extends Component { 
    
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false
        };  
        this.title = React.createRef();
        this.description = React.createRef();
        this.startDate = React.createRef();
        this.finishDate = React.createRef();
        this.longTerm = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.longTerms = []

        Axios.get(`http://localhost:4000/longTerm`).then(
      (data) => {
        if (data.data.body.status == "SUCCESS") {
          this.longTerms = data.data.body.data
        } else if (data.data.body.status == "ERROR") {
          alert("Server Down");
        }
      }
    )
       
    }  
   
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  
  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    } 
   
    

    handleSubmit(e) {
      e.preventDefault();
      console.log(this.longTerm.current.value);
      Axios.put("http://localhost:4000/shortTerm", {
      title: this.title.current.value,
      description: this.description.current.value,
      startDate: this.startDate.current.value.substring(0,14),
      finishDate: this.finishDate.current.value.substring(0,14),
      longTerm: this.longTerm.current.value
    }).then((data) => {
      if (data.status == 200) {
        alert("Added Succesfully");
        this.props.onPopupClose(false); 
      } else if (data.status == 400) {
        alert("Server Down Try again after sometime");
      }
    });
    }
    render() {  
     
        return (  
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                >  
                    <Modal.Header >  
                        <Modal.Title id="sign-in-title" color="rgb(19, 179, 179)">  
                            Add Short Term Goal  
                         </Modal.Title>
                         <div onClick={() => this.isShowModal(true)} >
                          <MdCancel size="2rem" color="rgb(19, 179, 179)" />
                        </div>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <div className="signUp">  
                        <Form onSubmit={this.handleSubmit}>

 <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Title</Form.Label>
    <Form.Control placeholder="Title" class="hide-shadow"  ref={this.title} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={3} ref={this.description} />
  </Form.Group> 
   
  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
    <Form.Control as="select"  ref={this.longTerm}>
      <option selected="true" disabled="disabled">Select Long Term (Optional)</option>
      {this.longTerms.map((longterms) =>(
        <option value={longterms._id}>{longterms.title}</option>
      ) )
      }
      
    </Form.Control>
  </Form.Group>


  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Start Date</Form.Label>
      <Form.Control  type="date" ref={this.startDate} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Finish Date</Form.Label>
      <Form.Control  type="date" ref={this.finishDate}/>
    </Form.Group>
  </Row>

  <Button type="submit" className="float-end submit-btn">
    Submit
  </Button>
</Form>
</div>  
</Modal.Body>  
</Modal >  
</Fragment >  
  
        );  
    }  
}  
  
export default (ShortTermModal);  