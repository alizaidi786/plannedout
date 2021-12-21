import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LongTerm.css'
import Axios from "../../Axios";
import { Modal,Button,Col,Row } from 'react-bootstrap'

export default function LongTermViewModal(props) { 
  const [shortTermIds, setShortTermIds] = useState([]);

  // let shortTermIds = [];


  useEffect(() => {
    if(props.shortTerm){
       let arr1 = [];
      props.shortTerm.map((shortId) => {
        Axios.get(`http://localhost:4000/shortTerm?id=${shortId}`).then(
          (data) => {
            if (data.data.body.status == "SUCCESS") {
              const arr2 = [...arr1,data.data.body.data]
              setShortTermIds(arr2)
              // shortTermsSelected.push(data.data.body.data);
              
            } else if (data.data.body.status == "ERROR") {
            }
          }
        );
      })
    }
  })
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
           View Long Term Goal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.title}</h4>
          <p>{props.description}</p>
          <Row>
            <Col>Start Date: {props.startDate}</Col>
            <Col>Finish Date: {props.finishDate}</Col>
          </Row>
          <div style={{display: shortTermIds.length === 0 ?  'none' : 'block' }}>
          <h6>Short Terms</h6>
          { shortTermIds.map((shortTermsData) =>(
            <p>{shortTermsData.title}</p>
          ))
          }
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn close-view" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
    }
