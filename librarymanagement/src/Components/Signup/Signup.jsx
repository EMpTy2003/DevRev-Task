import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import dataDB from "../../backend/dataDb.json"; 

const Signup = () => {
    document.body.style.backgroundColor = "#D2E9E9";

    

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const userdata = {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: password,
        cart: [],
        rent: [],
    };

    const handelSubmit = (e) => {
            e.preventDefault();
            if(firstName==="" || lastName==="" || emailId==="" || password==="" || confirmPassword===""){
                alert("Please fill all the fields");
            }
            else if(password!==confirmPassword){
                alert("Password and Confirm Password should be same");
            }
            else{
                fetch(dataDB.backend.url+"/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userdata),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        alert("Signup Successful");
                    });
                window.location.href = "/login";
            }
        }

    return (
        <div>
            <Container fluid>
                <Row className="m-3">
                    <Col
                        lg={{ span: 4, offset: 4 }}
                        style={{ borderRadius: "1rem" }}
                        className="p-4"
                    >
                        <div style={{ textAlign: "center" }}>
                            <h3>Signup</h3>
                        </div>
                        <Form >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>{setFirstName(e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>{setLastName(e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmailId(e.target.value)}} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                            </Form.Group>
                        </Form>
                        <div style={{ textAlign: "center" }}>
                            <Button className="my-2 mb-4" variant="primary" type="submit" onClick={handelSubmit}>
                                Signup
                            </Button>
                            <p>
                                If you already have a account <a style={{textDecoration:"none"}} href="/login">Login</a>{" "}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;
