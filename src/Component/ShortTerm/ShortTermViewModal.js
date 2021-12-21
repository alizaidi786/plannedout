import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShortTerm.css'
import Axios from "../../Axios";
import LongTermViewModal from "../LongTerm/LongTermViewModal"
import { Modal,Button,Col,Row } from 'react-bootstrap'

export default function ShortTermViewModal(props) { 
  const [longTerm, setLongTerm] = useState([]); 
  const [modalViewShow, setViewModalShow] = React.useState(false)

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

  // useEffect( () => {
  //   if(longTerm.title){    
  //   }else{
  //      var long = document.getElementById("longtermTitle")
  //      long.style.display = "none"
  //   }
  // }
  // )
    

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
           Short Term Goal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.title}</h4>
          <p>{props.description}</p>
          <div id="longtermTitle"  style={{display: longTerm.title ? 'block' : 'none' }} className="show-another-term" >
          <h6>Long Term Goal:</h6>
          <p  onClick={() => setViewModalShow(true)}>{longTerm.title}</p>
          </div>
          <LongTermViewModal
          show={modalViewShow}
          onHide={() => setViewModalShow(false)}
          title = {longTerm.title}
          description= {longTerm.description}
          startDate= {longTerm.startDate}
          finishDate= {longTerm.finishDate}
        />
          <Row>
            <Col>Start Date: {props.startDate}</Col>
            <Col>Finish Date: {props.finishDate}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn close-view" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
    }
