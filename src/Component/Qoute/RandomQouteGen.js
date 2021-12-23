import {
    Card,
    CardContent,
    CardActions,
    IconButton,
    Typography,
  } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import {
    FileCopy as FileCopyIcon,
    Refresh as RefreshIcon,
  } from "@material-ui/icons";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";


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

export default function RandomQouteGen(){
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingQuote, setLoadingQuote] = useState(false);
    const [quoteCopied, setQuoteCopied] = useState(false);
    const [quote, setQuote] = useState({});

    useEffect(() => {
        fetchRandomQuote();
      }, []);

    function copyQuote() {
        navigator.clipboard.writeText(quote.content + " - " + quote.author);
        setQuoteCopied(true);
      }
    
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

    return(
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
    )
}