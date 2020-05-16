import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Img from "./upload-icon.png";

function Imagebox(props) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const handleFiles = (files) => {
    setFile(files);
    visionAPI(files);
  };

  const visionAPI = (files) => {
    axios({
      method: "POST",
      url: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_API_KEY}`,
      data: {
        requests: [
          {
            image: {
              content: files.base64.replace(/^data:image\/[a-z]+;base64,/, ""),
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
    }).then((params) => setData(params));
  };

  return (
    <div>
      <div style={{ display: "inline-flex", marginTop: "2rem" }}>
        <Jumbotron fluid id="jumbotron-uploader">
          <Container id="uploader">
            <ReactFileReader handleFiles={handleFiles} base64={true}>
              <React.Fragment>
                <Button variant="outline-info" className="btn">
                  <img src={Img} alt="%%" />
                  <br />
                  Click to upload
                </Button>
              </React.Fragment>
            </ReactFileReader>
          </Container>
        </Jumbotron>
      </div>

      {file && (
        <div style={{ display: "inline-flex", marginTop: "2rem" }}>
          <Jumbotron fluid style={{ width: "500px", display: "flex" }}>
            <Container>
              <h3 className="result-text">Original Image</h3>
              <img
                src={URL.createObjectURL(file.fileList[0])}
                alt="hello"
                style={{ width: "450px", height: "500px" }}
              />
            </Container>
          </Jumbotron>

          <Jumbotron fluid style={{ width: "500px", display: "flex" }}>
            <Container>
              {data.data && data.data.responses[0].textAnnotations !== undefined ? (
                <div>
                  <h3 className="result-text">Generated Text</h3>
                  {data.data.responses[0].textAnnotations.map((elem) => {
                    return (
                      <Card>
                        <ListGroup variant="flush">
                          <ListGroup.Item id="list-item">
                            {elem.description}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <h2>Plze upload a valid image with text..</h2>
              )}
            </Container>
          </Jumbotron>
        </div>
      )}
    </div>
  );
}

export default Imagebox;
