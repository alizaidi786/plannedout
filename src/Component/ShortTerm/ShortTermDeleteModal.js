import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShortTerm.css'
import { Modal,Button } from 'react-bootstrap'
import Axios from '../../Axios'

export default function ShortTermDeleteModal(props) { 
    const deleteTerm = () =>{
        Axios.delete(`http://localhost:4000/shortTerm?id=${props._id}`).then((data) => {
          if (data.status === 200) {
            console.log(data.data.body.data);
            alert("Deleted Succesfully");
          } else if (data.status === 400) {
            alert("Server Down Try again after sometime");
          }
        });
        document.getElementById('close-view').click()
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
           Delete Short Term Goal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.title}</h4>
          <div className="delete-confirmation">
          <Button className="btn float-right" onClick={deleteTerm}>Yes</Button>
          <Button className="btn float-right" onClick={props.onHide}>No</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn close-view" id="close-view" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
    }
