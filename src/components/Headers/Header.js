/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import axios from "axios";

const Header = () => {
  const [sensorValues, setSensorValues] = useState({
    TMP36Value: 0,
    MQ2Value: 0,
    MQ7Value: 0,
    MQ135Value: 0,
    TCRT5000Value: 0,
  });

  useEffect(() => {
    const fetchSensorValues = async () => {
      try {
        const responses = await Promise.all([
          axios.get('https://ensc351-finalproject.onrender.com/alert/TMP36'),
          axios.get('https://ensc351-finalproject.onrender.com/alert/MQ2'),
          axios.get('https://ensc351-finalproject.onrender.com/alert/MQ7'),
          axios.get('https://ensc351-finalproject.onrender.com/alert/MQ135'),
          axios.get('https://ensc351-finalproject.onrender.com/alert/TCRT5000'),
        ]);

        const data = responses.map(response => response.data);
        setSensorValues({
          TMP36Value: data[0].TMP36Value,
          MQ2Value: data[1].MQ2Value,
          MQ7Value: data[2].MQ7Value,
          MQ135Value: data[3].MQ135Value,
          TCRT5000Value: data[4].TCRT5000Value,
        });
      } catch (error) {
        console.error('Error fetching sensor values:', error);
      }
    };

    const interval = setInterval(fetchSensorValues, 1000); // Fetch every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Temperature Sensor (TMP36)
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {sensorValues.TMP36Value}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Flammable Gas and Smoke Sensor (MQ-2)
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{sensorValues.MQ2Value}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Carbon Monoxide Gas Sensor (MQ-7)
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{sensorValues.MQ7Value}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Air Quality Sensor (MQ-135)
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{sensorValues.MQ135Value}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
