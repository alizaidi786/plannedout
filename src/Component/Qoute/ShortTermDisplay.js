import React, { useEffect, useState } from "react";
import ShortTerm from '../ShortTerm/ShortTerm'
import Axios from "../../Axios";
import { Row,Col } from 'react-bootstrap'
import ShortTermCrudHandle from "../ShortTerm/ShortTermCrudHandle";
import { Card,CardContent } from "@material-ui/core";
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Qoute.css'

export default function ShortTermDisplay(){
    const [shortTerms, setShortTerms] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:4000/shortTerm`).then(
          (data) => {
            if (data.data.body.status === "SUCCESS") {
              setShortTerms(data.data.body.data);
            } else if (data.data.body.status === "ERROR") {
              alert("Server Down");
            }
          }
        );
      }, [shortTerms] )
      

    return(
        <Card variant="outlined" className='term-card'>
        <div className="term-headline">
        <h4>Short Term</h4>
        </div> 
        <div className="term-content">
  
        {shortTerms.map((shortTerms) => (
          <div >
             <Card variant="outlined" className="card-style-content" >
              <CardContent>
              <Col> <h5>{shortTerms.title}</h5></Col>
              <Row>
               <Col><p>Start Date: {shortTerms.startDate}</p></Col>
               <Col><p>Finish Date: {shortTerms.finishDate}</p></Col>
              </Row>
              
               < ShortTermCrudHandle
                 _id = {shortTerms._id}
                 title={shortTerms.title}
                 description={shortTerms.description}
                 startDate={shortTerms.startDate}
                 finishDate={shortTerms.finishDate}
                 longTerm={shortTerms.longTerm}  />
              </CardContent>
            </Card>  
          </div>
              
         )) }
        </div>
        <ShortTerm />
      </Card>
    )
}