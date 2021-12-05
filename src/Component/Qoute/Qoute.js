import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Qoute.css'
import { Navbar,Container,Nav,NavDropdown,Row,Col } from 'react-bootstrap'
import axios from "axios";
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

  useEffect(() => {
    fetchRandomQuote();
  }, []);

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
      <Nav.Link href="/qoute">Homepage</Nav.Link>
      <Nav.Link href="#features">Activity</Nav.Link>
      <Nav.Link href="#pricing">Plan</Nav.Link>
      <NavDropdown title="Discuss" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Friends</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Groups</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Chat</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#pricing">Contact Us</Nav.Link>
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
    <div className="goals">
    <h2>Goals</h2>
    </div>
    </Col>
  </Row>
  <Row >
    <Col className="text-center text-md-right">
    <Card variant="outlined">
      <div className="sterm">
      <h3>Short Term</h3>
      </div> 
      <div className="">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident hic repellendus impedit expedita mollitia voluptas in rem totam molestiae ducimus, facilis tempore magni iure deleniti eos error corrupti sapiente! Exercitationem quod harum optio ipsum saepe similique, quam eius aperiam expedita, incidunt in fugit sit reprehenderit ut nisi porro, repellendus quia odio facere nemo molestias quas excepturi esse beatae. Ullam eius impedit obcaecati modi vel voluptatem delectus fuga, qui sequi sed consequatur necessitatibus. Temporibus quaerat totam similique earum expedita et atque corrupti magni excepturi rem neque suscipit, doloremque aperiam harum exercitationem provident beatae quisquam quas veritatis nulla quos consequatur ut tenetur!</p>
      </div>
    </Card>
    </Col>
    <Col className="text-center text-md-right">
    <Card variant="outlined"> 
     <h3>Long Term</h3>
     <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad praesentium officia, error ea consequuntur? Itaque, ipsum unde nam eveniet deleniti earum, quos non sequi architecto, accusantium sunt. Sint eius quod sed eum unde quibusdam? Necessitatibus odio libero omnis illo placeat doloribus id beatae provident est quod. Excepturi hic sed sunt nisi aut odio dignissimos, dicta, facilis possimus obcaecati iste? Iusto voluptatem, doloremque vitae voluptas nemo deserunt voluptatum perspiciatis labore necessitatibus numquam expedita non magnam modi cupiditate adipisci eligendi pariatur, beatae deleniti nulla eum quibusdam explicabo magni. Eveniet soluta tenetur doloremque labore quos laborum? Quam illo odio sunt tenetur fugit!</p>
    </Card>
    </Col>
  </Row>
</Container>
           
       </div>
    );
}