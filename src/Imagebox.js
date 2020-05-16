import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ReactFileReader from "react-file-reader";

function Imagebox(props) {
  const handleFiles = (files) => {
    visionAPI(files);
  };

  const visionAPI = (files) => {
    console.log(files.base64);
    axios({
      method: "POST",
      url:
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAnqhvoLgY0djZVkr_BgyyMuNvZl3LR9mk",
      data: {
        requests: [
          {
            image: {
              content: files.base64.slice(23),
            },
            features: [
              {
                type: "DOCUMENT_TEXT_DETECTION",
                maxResults: 1,
              },
            ],
          },
        ],
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((params) => console.log(params));
  };

  return (
    <div style={{ display: "inline-flex", marginTop: "2rem" }}>
      <Jumbotron fluid style={{width: "600px", borderRadius: "5px"}}>
        <Container>
          <ReactFileReader handleFiles={handleFiles} base64={true}>
            <Button variant="outline-info"className="btn">Click to upload</Button>
          </ReactFileReader>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Imagebox;
