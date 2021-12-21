import React from "react";
import ShortTermViewModal from "./ShortTermViewModal";
import { BsEyeFill } from "react-icons/bs"
import { MdModeEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import { Row,Col } from 'react-bootstrap'
import ShortTermEditModal from "./ShortTermEditModal"
import ShortTermDeleteModal from "./ShortTermDeleteModal"

export default function ShortTermCrudHandle(props) {
    const [modalViewShow, setViewModalShow] = React.useState(false)
    const [modalEditShow, setEditModalShow] = React.useState(false)
    const [modalDeleteShow, setDeleteModalShow] = React.useState(false)
    return (
      <div>
        <Row>
          <Col>
          < BsEyeFill cursor= "pointer" size="1.5rem"  color="rgb(19, 179, 179)" onClick={() => setViewModalShow(true)}/>
        <ShortTermViewModal
          show={modalViewShow}
          onHide={() => setViewModalShow(false)}
          title = {props.title}
          description= {props.description}
          startDate= {props.startDate}
          finishDate= {props.finishDate}
          longTerm={props.longTerm}
        />
          </Col>
          <Col>
          < MdModeEdit cursor= "pointer" size="1.5rem"  color="rgb(19, 179, 179)" onClick={() => setEditModalShow(true)}/>
        <ShortTermEditModal
          show={modalEditShow}
          onHide={() => setEditModalShow(false)}
          _id = {props._id}
          title = {props.title}
          description= {props.description}
          startDate= {props.startDate}
          finishDate= {props.finishDate}
          longTerm={props.longTerm}
        />
          </Col>
          <Col>
          < MdDelete cursor= "pointer" size="1.5rem"  color="rgb(19, 179, 179)" onClick={() => setDeleteModalShow(true)}/>
        <ShortTermDeleteModal
          show={modalDeleteShow}
          onHide={() => setDeleteModalShow(false)}
          _id = {props._id}
          title = {props.title}
          description= {props.description}
          startDate= {props.startDate}
          finishDate= {props.finishDate}
          longTerm={props.longTerm}
        />
          </Col>
        </Row>
      </div>
    );
  }
  