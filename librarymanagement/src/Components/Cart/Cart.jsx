import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "./Cart.css";
import CartItems from "../CartItems/CartItems";
import dataDb from "../../backend/dataDb.json";
import { useState } from "react";

const Cart = () => {

    var TotalItems = 0;
    var TotalPrice = 0;
    var DeliveryCharges = 0;

    const date = new Date();

    const [showConfirm, setShowConfirm] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("user"));

    const userCart = dataDb.users.filter((item) => item.id === user.id);

    const cartItems = userCart[0].cart;

    cartItems.map((item) => {
        TotalItems = TotalItems + 1;
        TotalPrice = TotalPrice + item.price;
        return null;
    })

    const redudeStock = () => {
        cartItems.map((item) => {
            const book = dataDb.Books.filter((book) => book.id === item.id);
            book[0].stock = book[0].stock - 1;
            fetch(dataDb.backend.url + "/books/" + book[0].id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book[0]),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                )
            return null;
        })
    }

    const handelPlaceOrder = () => {
        fetch(dataDb.backend.url + "/users?id=" + user.id)
            .then((res) => res.json())
            .then((data) => {
                const userCart = data[0].cart;

                userCart.map((item) => {
                    item.orderDate = date.toLocaleDateString();
                    item.orderStatus = "Delivered";
                    return null;
                })

                if (userCart.length > 0) {
                    data[0].rent.push(...userCart);
                    data[0].cart = [];
                    redudeStock();
                    fetch(dataDb.backend.url + "/users/" + user.id, {
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
                }
                else {
                    alert("Cart is Empty");
                }
            })
    }

    const handelOrder = () => {
        
        if (cartItems.length > 0){
            setShowConfirm(true);
        }
        else{
            alert("Cart is Empty");
        }
        
    }

    const handelConfirmOrder = () => {
        setShowConfirm(false);
        setShowStatus(true);
        handelPlaceOrder();
    }

    if (TotalPrice) {
        if (TotalPrice < 500) {
            DeliveryCharges = 100;
        }
        else if (TotalPrice < 2000) {
            DeliveryCharges = 50;
        }
        else {
            DeliveryCharges = 0;
        }
    }
    else {
        DeliveryCharges = 0;
    }



    if (user === null) {
        alert("Please Login First");
    }
    else {

    }

    return (
        <Container fluid>
            <Row className="m-3" style={{ textAlign: "center" }}>
                <h1 style={{fontWeight:"600"}} >CART ITEMS</h1>
            </Row>
            <Row className="m-5">
                <Col lg={{ span: 9 }} >
                    <Row >
                        <h3 style={{ fontWeight: "600" }}>Products :</h3>
                    </Row>
                    <Row>
                        <div style={{ width: "99%" }} >
                            <hr />
                        </div>
                        {
                            cartItems.map((item, index) => {
                                return (
                                    <CartItems index={index}
                                        img={item.bookImgUrl}
                                        title={item.bookName}
                                        description={item.bookDescription}
                                        author={item.bookAuthor}
                                        publishedDate={item.bookPublishedDate}
                                        price={item.price}
                                    />
                                )
                            }
                            )
                        }
                    </Row>
                </Col>
                <Col lg={{ span: 3 }} >
                    <div className="order-summary " >
                        <Row >
                            <h3>Order Summary</h3>
                        </Row>
                        <Row>
                            <hr />
                            <Col >
                                <p>Total items : </p>
                                <p>Total Price : </p>
                                <p>Delivery Charges : </p>
                            </Col>
                            <Col className="price">
                                <p>{TotalItems}</p>
                                <p>₹ {TotalPrice}</p>
                                <p>₹ {DeliveryCharges}</p>
                            </Col>

                            <hr />
                        </Row>
                        <Row>
                            <h4>Grand Total : <p className="price"> ₹ {TotalPrice + DeliveryCharges}</p> </h4>
                        </Row>
                        <Row>
                            <Button variant="success" className="w-100" onClick={handelOrder} >Place Order</Button>
                        </Row>
                    </div>

                </Col>
            </Row>

            <div className="confirmOrder">
                <Modal show={showConfirm}>
                    <Modal.Header onClick={()=>{setShowConfirm(false)}} closeButton>
                        <Modal.Title>Order Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Click on Confirm if you want to place the order. </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handelConfirmOrder}>
                            Confirm
                        </Button>
                        <Button variant="danger" onClick={()=>{setShowConfirm(false)}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
            <div className="orderstatus">
                <Modal show={showStatus}>
                    <Modal.Header onClick={()=>{setShowStatus(false)}} closeButton>
                        <Modal.Title>Order Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Your Order has been placed. </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={()=>{setShowStatus(false)}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </Container>
    )

}

export default Cart;