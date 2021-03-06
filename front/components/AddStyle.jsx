import React from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  FormControl,
  FormFile,
  Alert,

  //   FormFileInput,
  //   FormFileLabel
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";

export default ({
  handleChange,
  handleStyleSubmit,
  handleStyleFile,
  styleName,
}) => {
  const formStyle = {
    width: "80%",
    maxWidth: "800px",
    height: "110%",
    padding: "3rem",
    borderRadius: "0px",
    boxShadow: "8px 8px 15px -10px rgba(0,0,0,0.39)",
    justifyContent: "center",
    alignItems: "center",
  };

  const divFormStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBlockEnd: "5rem",
    marginBlockStart: "0.5rem",
  };

  const isZodiac = function () {
    if (styleName === "zodiac" || styleName === "Zodiac") {
      return (
        <>
          <Form.Group>
            <Form.Label>Tipografía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Keep Calm"
              name="styleTipo"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Signo</Form.Label>
            <Form.Control as="select" name="styleSigno" onChange={handleChange}>
              <option>n/a</option>
              <option>Aries</option>
              <option>Tauro</option>
              <option>Géminis</option>
              <option>Cáncer</option>
              <option>Leo</option>
              <option>Virgo</option>
              <option>Libra</option>
              <option>Escorpio</option>
              <option>Sagitario</option>
              <option>Capricornio</option>
              <option>Acuario</option>
              <option>Piscis</option>
            </Form.Control>
          </Form.Group>
        </>
      );
    }
  };

  return (
    <div style={divFormStyle}>
      <Card style={formStyle} className="login-container">
        <h3
          className="d-flex justify-content-center"
          style={{ marginBlockEnd: "1rem" }}
        >
          Agregar un estilo
        </h3>

        <Form
          type="submit"
          name="styleImg"
          encType="multipart/form-data"
          onSubmit={handleStyleSubmit}
        >
          {/* *****************
           ******Estilo********
           **************** */}
          <Form.Group>
            <Form.Label>Estilo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zodiac"
              name="styleName"
              onChange={handleChange}
            />
            {/* *****************
             ******Color*********
             **************** */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Green"
              name="styleColor"
              onChange={handleChange}
            />
          </Form.Group>
          {/* *****************
           ****Tipografia******
           **************** */}

          {/* *****************
           ******Signo*********
           **************** */}

          {isZodiac()}

          <Form.Group controlId="formBasicCheckbox"></Form.Group>
          {/* *****************
           ******Imagen********
           **************** */}
          <FormFile id="styleImg" name="styleImg">
            <FormFile.Label data-browse="Subir Archivo">
              <FontAwesomeIcon icon={faSearch} />
            </FormFile.Label>
            <FormFile.Input
              id="styleImg"
              onChange={handleStyleFile}
              className="boton-outline"
            />
          </FormFile>
          {/* *****************
           ******Boton*********
           **************** */}
          <Button
            className="boton-outline"
            type="submit"
            style={{ marginBlockStart: "0.5rem", marginBlockEnd: "1rem" }}
            onClick={handleStyleSubmit}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Form>
      </Card>
    </div>
  );
};
