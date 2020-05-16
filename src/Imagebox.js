import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Imagebox(props) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const handleFiles = (files) => {
    setFile(files);
    visionAPI(files);
  };

  const visionAPI = (files) => { 
      
    console.log(process.env)
    axios({
      method: "POST",
      url:
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_API_KEY}`,
      data: {
        requests: [
          {
            image: {
              content: files.base64.slice(23),
            },
            features: [
              {
                type: "DOCUMENT_TEXT_DETECTION",
              },
            ],
          },
        ],
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((params) => setData(params.data.responses[0].textAnnotations));
    // setDate(params)
  };

  console.log("main:", file);
  console.log(data, "dsff");

  return (
    <div>
      <div style={{ display: "inline-flex", marginTop: "2rem" }}>
        <Jumbotron style={{ width: "600px" }}>
          <Container>
            <ReactFileReader handleFiles={handleFiles} base64={true}>
              <React.Fragment>
                <Button variant="outline-info" className="btn">
                  Click to upload
                </Button>
              </React.Fragment>
            </ReactFileReader>
          </Container>
        </Jumbotron>
      </div>

      {file && (
        <div style={{ display: "inline-flex", marginTop: "2rem" }}>
          <Jumbotron fluid style={{ width: "600px" }}>
            <Container>
              <div>
                <img
                  src={URL.createObjectURL(file.fileList[0])}
                  alt="hello"
                  style={{ width: "250ox", height: "300px" }}
                />
                {data.map((elem) => {
                  return (
                    <Card>
                      <ListGroup variant="flush">
                        <ListGroup.Item>{elem.description}</ListGroup.Item>
                      </ListGroup>
                    </Card>
                  );
                })}
              </div>
            </Container>
          </Jumbotron>
        </div>
      )}
    </div>
  );
}

export default Imagebox;
