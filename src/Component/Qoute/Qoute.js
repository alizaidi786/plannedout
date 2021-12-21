import React, { useEffect, useRef, useState } from "react";
import Popup from 'reactjs-popup';
import ShortTerm from '../ShortTerm/ShortTerm'
import LongTerm from '../LongTerm/LongTerm'
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Qoute.css'
import { BsEyeFill } from "react-icons/bs"
import  ShortTermModal from "../ShortTerm/ShortTermModal"
import { MdModeEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import { Navbar,Container,Nav,NavDropdown,Row,Col } from 'react-bootstrap'
import axios from "axios";
import Axios from "../../Axios";
import ShortTermCrudHandle from "../ShortTerm/ShortTermCrudHandle";
import LongTermCrudHandle from "../LongTerm/LongTermCrudHandle";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import {
  FileCopy as FileCopyIcon,
  Refresh as RefreshIcon,
} from "@material-ui/icons";
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1100,
    minHeight: 100,
  },
  content: {
    fontSize: "1.5rem",
    marginTop: 8
  },
  author: {
    marginTop: 12,
    fontSize: ".8rem",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: "15px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
  quoteCopiedMessage: {
    color: "green",
    fontSize: "13px",
    marginLeft: "10px",
  },
}));

export default function Qoute(){

  const classes = useStyles();

  const [quote, setQuote] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteCopied, setQuoteCopied] = useState(false);
  const [shortTerms, setShortTerms] = useState([]);
  const [longTerms, setLongTerms] = useState([]);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:4000/shortTerm`).then(
      (data) => {
        if (data.data.body.status == "SUCCESS") {
          setShortTerms(data.data.body.data);
        } else if (data.data.body.status == "ERROR") {
          alert("Server Down");
        }
      }
    );
  }, [shortTerms] )

  useEffect(() => {
    Axios.get(`http://localhost:4000/longTerm`).then(
      (data) => {
        if (data.data.body.status == "SUCCESS") {
          setLongTerms(data.data.body.data);
        } else if (data.data.body.status == "ERROR") {
          alert("Server Down");
        }
      }
    );
  }, [longTerms] )
  async function fetchRandomQuote() {
    try {
      setLoadingQuote(true);
      setErrorMessage("");
      setQuoteCopied(false);
      const quoteObject = await axios.get("https://api.quotable.io/random");
      setQuote(quoteObject.data);
      setLoadingQuote(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoadingQuote(false);
    }
  }

  function copyQuote() {
    navigator.clipboard.writeText(quote.content + " - " + quote.author);
    setQuoteCopied(true);
  }


    return(
       <div>
         
 <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/qoute">Planned Out</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    <Nav>
      <Nav.Link href="/qoute" className='active'>Homepage</Nav.Link>
      <Nav.Link href="#features">Activities</Nav.Link>
      <Nav.Link href="#pricing">Plan</Nav.Link>
      <Nav.Link href="#pricing">Chat</Nav.Link>
      <NavDropdown title="My Account" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Friends</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Groups</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3"><Popup trigger={<button> Click to open popup </button>} 
     position="right center">
      <div>GeeksforGeeks</div>
      <button>Click here</button>
    </Popup></NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

<Container className="contact-content debug-border">
  <Row className="align-items-center">
    <Col className="text-center text-md-right">
    <Card className={classes.root}>
      <CardContent>
        {loadingQuote ? (
          <div>
            <Skeleton height={80} width={"38vw"} animation="wave" />
            <Skeleton height={30} width={"20vw"} animation="wave" />
          </div>
        ) : quote.content ? (
          <div>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {quote.content}
            </Typography>
            <Typography className={classes.author} color="textSecondary">
              - {quote.author}
            </Typography>
          </div>
        ) : (
          <p className={classes.errorMessage}>{errorMessage}</p>
        )}
      </CardContent>
      <CardActions disableSpacing className={classes.footer}>
        <div>
          {quoteCopied ? (
            <p className={classes.quoteCopiedMessage}>
              Quote copied to clipboard
            </p>
          ) : (
            <IconButton aria-label="copy-icon" onClick={copyQuote}>
              <FileCopyIcon />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton aria-label="copy-icon" onClick={fetchRandomQuote}>
            <RefreshIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>  
    </Col>
  </Row>
  <Row>
    <Col className="text-center text-md-right" >
    <div className="goals term-card">
    <h2>Goals</h2>
    </div>
    </Col>
  </Row>
  <Row >
    <Col className="text-center text-md-right">
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
   
    </Col>
    <Col className="text-center text-md-right">
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
    </Col>
  </Row>
</Container>
           
       </div>
    );
}