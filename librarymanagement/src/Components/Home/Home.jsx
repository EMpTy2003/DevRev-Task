import bg from "./bg.jpg"

const Home = () => {

    document.body.style.backgroundImage = `url(${bg})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    //darken the background image

    document.body.style.background = "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(" + bg + ")";

    return (
        <div >
            <div className="Home">
                <div className="HomeHeader">
                    <h1 style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        fontWeight: "700",
                        color: "white",
                        textAlign: "center",
                        fontSize: "4rem",
                    }} > Welcome to <br /> Vel Tech Multi Tech Book Store</h1>

                </div>
            </div>
        </div>
    );
    }

export default Home;