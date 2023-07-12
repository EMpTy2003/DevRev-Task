import { Container,Nav,Navbar } from "react-bootstrap";
import cart from "./cart.png"
import "./NavBarComp.css"

const NavBarComp = () => {


    const login = sessionStorage.getItem("login") === "true" ? true : false;

    const handelclick = () => {
        if (login === true) {
            sessionStorage.clear();
            window.location.href = "/login";
        } else {
            window.location.href = "/login";
        }
    }

    return (
        <Navbar className="navbarcomp"  height="8rem" collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"style={{fontSize:"25px"}} >Vel Tech Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav >

                    <Nav.Link style={{paddingTop:"10px"}} href="/">Home</Nav.Link>
                    <Nav.Link style={{paddingTop:"10px"}} href="/book">Books</Nav.Link>
                    <Nav.Link style={{paddingTop:"10px"}} href="/orders">Orders</Nav.Link>
                    <Nav.Link className="px-3" href="/cart"><img src={cart} alt="Cart" width={"30px"} height={"30px"} /></Nav.Link>
                    <Nav.Link style={{paddingTop:"10px"}} onClick={handelclick}>{login === false ? "Login" : "Logout"}</Nav.Link>
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
    )

}

export default NavBarComp;