function App() {

    function callApi() {
        fetch("http://localhost:5000/api")
            .then(response => response.json()).then(data => console.log(data));
    }

    return (
        <div>
            <h1>To Do</h1>
            <button onClick={callApi}>click me</button>
        </div>
    );
}

export default App;
