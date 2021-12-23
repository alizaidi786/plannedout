import React from "react";
import LongTermViewModal from "./LongTermViewModal";
import { BsEyeFill } from "react-icons/bs"
import { MdModeEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import { Row,Col } from 'react-bootstrap'
import LongTermEditModal from "./LongTermEditModal"
import LongTermDeleteModal from "./LongTermDeleteModal"
import AddShortTermToLong from "./AddShortTermToLong"
import './LongTerm.css';

export default function LongTermCrudHandle(props) {
    const [modalViewShow, setViewModalShow] = React.useState(false)
    const [modalEditShow, setEditModalShow] = React.useState(false)
    const [modalDeleteShow, setDeleteModalShow] = React.useState(false)
    const [modalAddShortTerm, setAddShortTerm] = React.useState(false)

    return (
      <div>
        
           <button className="add-short-to-long"  onClick={() => setAddShortTerm(true)}>Add Short Term</button>
           <AddShortTermToLong
           show={modalAddShortTerm}
           onHide={() => setAddShortTerm(false)}
           longTermId = {props._id}
           longTermTitle = {props.title}
           />

         
        <Row>
          <Col>
          < BsEyeFill cursor= "pointer" size="1.5rem"  color="rgb(19, 179, 179)" onClick={() => setViewModalShow(true)}/>
        <LongTermViewModal
          show={modalViewShow}
          onHide={() => setViewModalShow(false)}
          title = {props.title}
          description= {props.description}
          startDate= {props.startDate}
          finishDate= {props.finishDate}
          shortTerm= {props.shortTerm}
        />
          </Col>
          <Col>
          < MdModeEdit cursor= "pointer" size="1.5rem"  color="rgb(19, 179, 179)" onClick={() => setEditModalShow(true)}/>
        <LongTermEditModal
          show={modalEditShow}
          onHide={() => setEditModalShow(false)}
          _id = {props._id}
          title = {props.title}
          description= {props.description}
          startDate= {props.startDate}
          finishDate= {props.finishDate}
          shortTerm= {props.shortTerm}
        />
          </Col>
          <Col>
          < MdDelete cursor= "pointer" size="1.5rem"  color="rgb(19, 179, 179)" onClick={() => setDeleteModalShow(true)}/>
        <LongTermDeleteModal
          show={modalDeleteShow}
          onHide={() => setDeleteModalShow(false)}
          _id = {props._id}
          title = {props.title}
          description= {props.description}
          startDate= {props.startDate}
          finishDate= {props.finishDate}
          shortTerm= {props.shortTerm}
        />
          </Col>
        </Row>
      </div>
    );
  }
  