// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostForm from './components/PostForm';
import './index.css'; // Import your CSS file

const App = () => {
    return (
        <Router>
            <div className="container"> {/* Apply container class */}
                <Routes>
                    <Route path="/" element={<PostForm />} />
                    {/* Add other routes here if needed */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
