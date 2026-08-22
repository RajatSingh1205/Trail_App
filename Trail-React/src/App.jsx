import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LoginCard from "./components/LoginCard";
import SignUp from "./components/SignUp";
import Home from "./pages/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import MovieInfo from "./pages/MovieInfo.jsx";

// function Login() {
//     return null;
// }

function App() {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    return (

        <>



            {/*<Navbar/>*/}
            {/*<div className="h-16 bg-black"></div>*/}
            {/*<div className=" min-h-screen bg-black">*/}
            {/*    <MovieInfo/>*/}
            {/*</div>*/}

            <div className="bg-black min-h-screen">
                <Navbar onLogin={() => setShowLogin(true)} />

                <Routes>
                    <Route
                        path="/"
                        element={<Welcome onGetStarted={() => setShowSignUp(true)} />}
                    />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/login" element={<LoginCard />} />
                    <Route path="/movie/:id" element={<MovieInfo />} />
                </Routes>

                {/*<Hero onGetStarted={() => setShowSignUp(true)} />*/}

                {/* Login Modal */}
                {showLogin && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                        <div className="relative">
                            <button
                                onClick={() => setShowLogin(false)}
                                className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-700"
                            >
                                ✕
                            </button>

                            <LoginCard onGetStarted={() => {setShowLogin(false); setShowSignUp(true) }}   />
                        </div>
                    </div>
                )}

                {/* Sign Up Modal */}
                {showSignUp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                        <div className="relative">
                            <button
                                onClick={() => setShowSignUp(false)}
                                className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-700"
                            >
                                ✕
                            </button>x
                            <SignUp onLogin={() => {
                                setShowSignUp(false);
                                setShowLogin(true);
                            }} />
                        </div>
                    </div>
                )}
            </div>
        </>


    );
}

export default App;