import React from "react";
import { useDropzone } from "react-dropzone";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';

function Imagebox(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Jumbotron fluid>
      <Container>
        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {files.length === 0 && (
                <p className="drag-text ">Select the image</p>
            )
            }
            {files.length !== 0 && (
                <p className="drag-text ">{files}</p>
            )}
          </div>
          <aside>
              {files.length !== 0 && (
                  
            <Button className ="btn-detect" variant="primary" size="lg" active>
              Detect
            </Button>) }
              
              {files.length === 0 && (
                  <Button className ="btn-detect" variant="primary" size="lg" disabled>
                  Detect
                </Button>)
              }
          </aside>
        </section>
      </Container>
    </Jumbotron>
  );
}

export default Imagebox;
