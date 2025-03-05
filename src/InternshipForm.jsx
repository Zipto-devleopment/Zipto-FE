import { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import SignaturePad from "react-signature-canvas";
import axios from "axios";
import { useNavigate } from "react-router";
import LoadingBar from "react-top-loading-bar";

const InternshipForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [domain, setDomain] = useState("Web Development");
  const [duration, setDuration] = useState("One Month");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const signatureRef = useRef(null);
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signatureRef.current || signatureRef.current.isEmpty() || !accepted) {
      alert("Please sign the form and accept the offer.");
      return;
    }

    const signatureData = signatureRef.current.toDataURL();
    const formData = { name, email, phone, domain, duration, signature: signatureData };

    try {
      setLoading(true);
      loadingBarRef.current.continuousStart(); // Start loading bar

      await axios.post("https://zipto-be.onrender.com/api/internships", formData);

      alert("Form submitted successfully!");
      navigate("/payment-page");
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      setLoading(false);
      loadingBarRef.current.complete(); // Stop loading bar
    }
  };

  return (
    <Container className="border text-start">
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      <h2 className="text-center bg-black text-white">Zipto Internship Offer Acceptance Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone No</Form.Label>
          <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Internship Domain</Form.Label>
          <Form.Select value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option>Web Development</option>
            <option>Full Stack</option>
            <option>Data Science & Analytics</option>
            <option>UI / UX Design</option>
            <option>Flutter Development</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Internship Duration</Form.Label>
          <Form.Select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option>One Month</option>
            <option>Two Months</option>
            <option>Three Months</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="I accept the offer." checked={accepted} onChange={(e) => setAccepted(e.target.checked)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Signature</Form.Label>
          <SignaturePad ref={signatureRef} canvasProps={{ className: "border w-100" }} />
          <Button variant="secondary" className="mt-2" onClick={() => signatureRef.current.clear()}>
            Clear
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Platform Fee (₹59)</Form.Label>
          <Form.Control type="text" value="59 INR" readOnly />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Accept"}
        </Button>
      </Form>
    </Container>
  );
};

export default InternshipForm;
