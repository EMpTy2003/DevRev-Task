import "./Orders.css"
import { Container,Row,Col,Card } from "react-bootstrap";
import dataDb from "../../backend/dataDb.json"

const Orders = () => {

    const user = JSON.parse(sessionStorage.getItem("user"))

    if (user === null) {
        window.location.href = "/login"
    }

    const orders = dataDb.users.find((item) => item.emailId === user.emailId).rent;

    return (
        <div className="Orders">
            <div className="OrderHeader">
                <h1 style={{fontWeight:"700"}} > Your Orders</h1>
            </div>
            <Container fluid>
                <Row xl={2} lg={2} md={1} sm={1} xs={1} >                
                {orders.map((item) => {
                    
                    return (
                         <Col lg={{span:6}} className="p-3" >
                            <div className="orderDetails">
                                <Row lg={2}>
                                    <Col lg={6} style={{display:"flex",justifyContent:"center",padding:"1rem"}}>
                                        <Card.Img style={{height:"15rem",width:"13rem"}} src={item.bookImgUrl} />
                                    </Col>
                                    <Col lg={6}>
                                        <div className="orderDetailsText">
                                            <h3>{item.bookName}</h3><hr />
                                            <p><b>Author :</b> {item.bookAuthor}</p>
                                            <p><b>Price :</b> {item.price}</p>
                                            <p><b>Order Date :</b> {item.orderDate}</p>
                                            <p><b>Order Status :</b> Delivered </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                         </Col>       
                    )
                })}
                </Row>

            </Container>
        </div>
    );
}

export default Orders;