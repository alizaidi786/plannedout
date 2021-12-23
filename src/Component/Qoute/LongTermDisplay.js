import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import { Row,Col } from 'react-bootstrap'
import LongTermCrudHandle from "../LongTerm/LongTermCrudHandle";
import LongTerm from '../LongTerm/LongTerm'
import { Card,CardContent } from "@material-ui/core";
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Qoute.css'

export default function LongTermDisplay(){
    const [longTerms, setLongTerms] = useState([]);
    useEffect(() => {
        Axios.get(`http://localhost:4000/longTerm`).then(
          (data) => {
            if (data.data.body.status === "SUCCESS") {
              setLongTerms(data.data.body.data);
            } else if (data.data.body.status === "ERROR") {
              alert("Server Down");
            }
          }
        );
      }, [longTerms] )


      return (
        <Card variant="outlined" className='term-card'> 
        <div className="term-headline">
         <h4>Long Term</h4>
         </div> 
         <div className="term-content">
         {longTerms.map((longTerms) => (
            <div >
               <Card variant="outlined" className="card-style-content" >
                <CardContent>
                <Col> <h5>{longTerms.title}</h5></Col>
                <Row>
                 <Col><p>Start Date: {longTerms.startDate}</p></Col>
                 <Col><p>Finish Date: {longTerms.finishDate}</p></Col>
                </Row>
                
                 < LongTermCrudHandle
                   _id = {longTerms._id}
                   title={longTerms.title}
                   description={longTerms.description}
                   startDate={longTerms.startDate}
                   finishDate={longTerms.finishDate}
                   shortTerm={longTerms.shortTerm} />
              
                </CardContent>
              </Card>  
            </div>
                
           )) }
         </div>
         <LongTerm />
        </Card>
      )
}