import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Footer from "./components/footer";

function App() {
    const [boardItems, setBoardItems] = useState(false);

    function getData() {
        fetch("/api/board")
            .then(response => response.json())
            .then(data => setBoardItems(data))
    }

    useEffect (() => {
        getData();
    }, []);

    return (
        <>
            <Navbar />
            <Main
                boardItems={boardItems}
                setBoardItems={setBoardItems}
            />
            <Footer />
        </>
    );
}

export default App;
