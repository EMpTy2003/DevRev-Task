import { Card,Container,Row,Col,Button } from "react-bootstrap";
import "./CartItems.css";
import dataDb from "../../backend/dataDb.json";


const CartItems = (props) => {

    const user=JSON.parse(sessionStorage.getItem("user"));
    
    const handelRemove = () => {
        fetch(dataDb.backend.url+"/users?id="+user.id)
        .then((res) => res.json())
        .then((data) => {
            const userCart = data[0].cart;
            userCart.splice(props.index,1);
            fetch(dataDb.backend.url+"/users/"+user.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data[0]),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        })
    }

    return (
        <div>
            <Card className="m-2 p-2">
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col lg={{ span: 3 }} >
                                <img src={props.img} alt="product" className="img-fluid" />
                            </Col>
                            <Col lg={{ span: 9 }} >
                                <Row>
                                    <Col lg={{ span: 6 }} >
                                        <Card.Title>{props.title}</Card.Title>
                                        <Card.Body className="cardBody">
                                            <Card.Text>
                                                {props.description}
                                            </Card.Text>
                                            <Card.Text>
                                               <b>Author : </b> {props.author}
                                            </Card.Text>
                                            <Card.Text>
                                                <b>Published Date : </b>{props.publishedDate}
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    
                                    <Col lg={{ span: 6 }} style={{textAlign:"end"}} >
                                        <h4>₹ {props.price}</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={{ span: 6 }} >
                                        <p>Quantity : 1</p>
                                    </Col>
                                    <Col lg={{ span: 6 }} >
                                        <Button variant="danger" className="w-100" onClick={handelRemove} >Remove </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CartItems;