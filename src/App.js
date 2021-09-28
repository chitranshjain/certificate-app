import logo from "./Assets/logo.png";
import React from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [certificateData, setCertificateData] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    getCertificateData();
  }, []);

  const getCertificateData = () => {
    setCertificateData();
    axios({
      method: "get",
      url: "https://faker-api.herokuapp.com/",
    }).then((response) => {
      setCertificateData(response.data);
      convertDates(response.data);
    });
  };

  const convertDates = (certificate) => {
    const sm = months[parseInt(certificate.startMonth.substring(5, 7))];
    const sy = certificate.startMonth.substring(0, 4);
    setStartDate(sm + ", " + sy);
    const em = months[parseInt(certificate.endMonth.substring(5, 7))];
    const ey = certificate.endMonth.substring(0, 4);
    setEndDate(em + ", " + ey);
  };

  return (
    <div className="App">
      <div className="certificate-parent">
        <Row className="certificate-row">
          <Col className="certificate-col bg-col" lg={3}></Col>
          <Col className="certificate-col" lg={9}>
            <h2>CERTIFICATE OF ACCEPTANCE</h2>
            <img src={logo} alt="logo" />
            <h6>
              DIGITAL GURUJI | ID :{" "}
              {certificateData && certificateData.certificateId}
            </h6>
            <p>This is to certify that</p>
            <h3>{certificateData && certificateData.name}</h3>
            <p>
              has been selected to be a part of Digital Guruji's 3 month digital
              marketing training and internship program
            </p>
            <p className="dark-text">
              He/She was adjudged to be one of the best Digital Marketing
              candidates among the batch for {startDate && startDate}
            </p>
            <Row className="certificate-row">
              <Col className="certificate-col">
                <h6 className="date-h">{startDate && startDate}</h6>
                <p>Month Of Issue</p>
              </Col>
              <Col className="certificate-col">
                <h6 className="date-h">{endDate && endDate}</h6>
                <p>Date Of Expiry</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
