import React, { Component, Fragment } from 'react';  
import { Modal, Form, Col, Button, Row } from 'react-bootstrap';  
import Axios from "../../Axios";
import "react-datepicker/dist/react-datepicker.css";
import { MdCancel } from 'react-icons/md';
import './LongTerm.css'

  
class LongTermModal extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false,
            shorts: []
        };  
        this.title = React.createRef();
        this.description = React.createRef();
        this.startDate = React.createRef();
        this.finishDate = React.createRef();
        this.shortTerm = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.shortTerms = [];

        Axios.get(`http://localhost:4000/shortTerm`).then(
      (data) => {
        if (data.data.body.status === "SUCCESS") {
          this.shortTerms = data.data.body.data
        } else if (data.data.body.status === "ERROR") {
          alert("Server Down");
        }
      }
    )
       
    }  
   
    handleChange(event) {
      console.log('entered');
      var values = []
      var options = event.target.options;
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
         values.push(options[i].value);
        }
      }
      this.setState({shorts: values});
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
      Axios.put("http://localhost:4000/longTerm", {
      title: this.title.current.value,
      description: this.description.current.value,
      startDate: this.startDate.current.value.substring(0,14),
      finishDate: this.finishDate.current.value.substring(0,14),
      shortTerm: this.state.shorts
    }).then((data) => {
      if (data.status === 200) {
        alert("Added Succesfully");
        this.props.onPopupClose(false); 
      } else if (data.status === 400) {
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
                            Add Long Term Goal  
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
    <Form.Control placeholder="Title" ref={this.title} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={3} ref={this.description} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Control as="select" multiple={true}  value={this.state.value} onChange={this.handleChange}>
      <option >Select Short Terms (Optional- Press Ctrl and then select multiple values)</option>
      {this.shortTerms.map((shortterms) =>(
        <option value={shortterms._id}>{shortterms.title}</option>
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
  
export default (LongTermModal);  