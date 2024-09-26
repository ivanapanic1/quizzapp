import React, {useEffect, useState} from 'react';
import {GlobalStyle, Wrapper} from "./APP.syles";
import Login from "./components/LoginComponent/LoginComponent";
import Register from "./components/registerComponent/registerComponent";


const App = () => {
    const [score, setScore] = useState(0);
    const [logged,setLoggedIn]=useState(false)
    const [showRegister, setShowRegister] = useState(false); // State to toggle between login and register forms
    useEffect(() => {
        // Check if the user is logged in by checking sessionStorage
        const user = sessionStorage.getItem("user");
        if (user) {
            setLoggedIn(true);
        }
    }, []);
    const handleLogin = () => {
        setLoggedIn(true);
    };
    const handleRegister = () => {
        setShowRegister(false);
    };
    const toggleForm = () => {
        setShowRegister(!showRegister);
    }; // Added


    return (
        <>
            <GlobalStyle />
            <Wrapper>
                {!logged && !showRegister && (
                    <Login onLogin={handleLogin} toggleForm={toggleForm} />
                )}

                {!logged && showRegister && (
                    <Register onRegister={toggleForm} toggleForm={toggleForm} />
                )}
            </Wrapper>
        </>
    );
};

export default App;