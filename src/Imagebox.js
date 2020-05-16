import React, { useState } from "react";
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
      <div style={{ marginTop: "2rem" }}>
        <div className="row justify-content-center">
          <ReactFileReader handleFiles={handleFiles} base64={true}>
            <React.Fragment>
              <Button variant="outline-primary" className="btn imageMedia">
                <img src={Img} alt="%%" />
                <br />
                Click to upload
              </Button>
            </React.Fragment>
          </ReactFileReader>
        </div>
      </div>

      {file && (
        <div className="container pt-5 pb-5">
          <div className="row justify-content-around">
            <div className="col-md-7 pt-5 image">
              <h3 className="result-text">Original Image</h3>
              <img
                src={URL.createObjectURL(file.fileList[0])}
                alt="hello"
                style={{ width: "450px", paddingBottom: '30px', borderRadius: '10px' }}
                className="imageMedia"
              />
            </div>

            <div className="col-md-3 pt-5 image">
              {data.data &&
              data.data.responses[0].textAnnotations !== undefined ? (
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
                <h2>Please upload a valid image with text..</h2>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Imagebox;
