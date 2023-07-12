import { Card ,Button,Col,Row } from "react-bootstrap";
import "./BookCard.css";
import dataDb from "../../backend/dataDb.json";

const BookCard = (props) => {

        
        const cart = {
            bookName: props.title,
            bookAuthor: props.authors,
            bookDescription: props.description,
            bookPublishedDate: props.publishedDate,
            bookImgUrl: props.image,
            id : props.id,
            price : props.price
        }

        const user = JSON.parse(sessionStorage.getItem("user"));

        const addCart = () => {
            fetch(dataDb.backend.url+"/users/"+user.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    data.cart.push(cart);
                    fetch(dataDb.backend.url+"/users/"+user.id, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                        }
                        );
                });
                
        }

        return (

            <Card style={{ width: '80%',backgroundColor:"#ECF8F9",padding:"2rem" ,margin:"1rem"}}    >
                <Row>
                    <Col lg={{span:4}} style={{display:"flex",justifyContent:"center",alignContent:"center" ,alignItems:"center"}} >
                        <Card.Img style={{height:'16rem',width:"auto",margin:'1rem'}} variant="top" src={props.image} />
                    </Col>
                    <Col lg={{span:8}} >
                        <Card.Body>
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Text>
                                {props.description}
                            </Card.Text>
                            <Card.Text>
                               <b>Author :</b> {props.authors}
                            </Card.Text>
                            <Card.Text>
                                <b>Published Date :</b> {props.publishedDate}
                            </Card.Text>
                            {/* <Button variant="primary"  >Add to Cart</Button> */}
                            <Button variant="success" style={{marginLeft:"1rem"}} onClick={addCart} >Rent ₹ {props.price} </Button>
                            <Card.Footer className="mt-3">
                                <small className="text-muted">Only {props.stock} Books in stock.</small>
                            </Card.Footer>
                        </Card.Body>

                    </Col>
                </Row>
            </Card>
            

        );
}

export default BookCard;