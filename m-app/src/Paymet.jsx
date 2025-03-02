import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Qrcode from "./assets/Qrcode.jpg";

function Paymet() {
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    if (!amount) {
      alert("Please enter a valid UTR number.");
      return;
    }
    if(amount.length!=12)
    {
      alert("Invalid UTR number Must be 12 Number");
      return;
    }

    try {
      const response = await axios.post("https://zipto-be.onrender.com/api/internships/utrsubmit", {
        utr: amount,
      });
      console.log("Response:", response.data);
      alert("UTR submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit UTR. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg text-center" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3">Zipto UPI Payment</h3>
        <img src={Qrcode} alt="QR Code" height={320} />
        <Form>
          <Form.Group>
            <Form.Label>Enter UTR No.</Form.Label>
            <Form.Control
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3 w-100" variant="success" onClick={handleSubmit}>
            Submit UTR
          </Button>
        </Form>
        <Row className="mt-3 text-center">
          <Col>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMyqM7pv04T82nGYoR6hQKa-HsJZ8gCmbXg&s"
              height={40}
              alt="Google Pay"
            />
          </Col>
          <Col>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRdYJdBBa3l7D6WIZNYxcgv-pMB9aqDdpulg&s"
              height={45}
              alt="Paytm"
            />
          </Col>
          <Col>
            <img
              src="https://seeklogo.com/images/P/phonepe-logo-B9E7D6F75F-seeklogo.com.png"
              height={45}
              alt="PhonePe"
            />
          </Col>
        </Row>
        <br />
        <Col>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThYZp2N8W-n_xmj-vEHpVuxfOdwd1x11hYoA&s"
            height={45}
            alt="UPI"
          />
        </Col>
      </Card>
    </Container>
  );
}

export default Paymet;
