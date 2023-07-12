import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import dataDB from "../../backend/dataDb.json";

const Books = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const handelSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetch(dataDB.backend.url+"/Books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, [search]);

  return (
    <Container fluid style={{paddingTop:"1rem"}}>
      <Form>
        <Row className="mx-5 my-3">
          <Col style={{ textAlign: "center" }} lg={3}>
            <h3>Book Search</h3>
          </Col>
          <Col lg={6}>
            <Form.Control
              type="text"
              placeholder="Search for a book"
              onChange={handelSearch}
            />
          </Col>
          <Col lg={3}>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }} lg={2}
        >
          {books
            .filter((book) => {
              if(book.stock !== 0){

              if (search === "") {
                return book;
              } else if (
                book.bookName.toLowerCase().includes(search.toLowerCase())
              ) {
                return book;
              }
              return null;
            }else{
              return null;
            }
            })
            .map((book) => (
              <BookCard key={book.id}
                image={book.imgUrl}
                title={book.bookName}
                description={book.description}
                authors={book.author}
                publishedDate={book.publishedDate}
                previewLink={book.previewLink}
                stock={book.stock}
                id={book.id}
                price={book.price}
              />
            ))}
        </Row>
      </Form>
    </Container>
  );
};

export default Books;
