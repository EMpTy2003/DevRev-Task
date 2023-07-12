import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import dataDB from "../../backend/dataDb.json";

const Login = () => {
    document.body.style.backgroundColor = "#D2E9E9";

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(dataDB.backend.url+"/users?emailId=" + emailId+"&password="+password)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setUser(data);
                });
    }, [emailId,password]);

    const handelSubmit = (e) => {
        e.preventDefault();
        if (emailId === "" || password === "") {
            alert("Please fill all the fields");
        } else {
            
            if(user.length>0){
                if(user[0].emailId === emailId && user[0].password === password){
                    window.location.href = "/";
                    sessionStorage.setItem("user",JSON.stringify(user[0]));
                    sessionStorage.setItem("login",true);
                }else{
                    alert("Invalid Credentials");
                }
                
            }else{
                alert("login failed")
            }
            
        }
    };

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
                            <h3>Login</h3>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e) => {
                                        setEmailId(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Form>
                        <div style={{ textAlign: "center" }}>
                            <Button
                                className="my-2 mb-4"
                                variant="primary"
                                type="submit"
                                onClick={handelSubmit}
                            >
                                Sign in
                            </Button>
                            <p>
                                If you don't have a account{" "}
                                <a style={{ textDecoration: "none" }} href="/signup">
                                    Sign up
                                </a>{" "}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
