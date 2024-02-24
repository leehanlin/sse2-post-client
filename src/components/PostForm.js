import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'; // Import your CSS file

const PostForm = () => {
    const [formData, setFormData] = useState({
        interestid: null, // Store interest ID
        interestName: '', // Store interest name
        header: '',
        description: '',
        visibility: ''
    });
    const [interests, setInterests] = useState([]);

    useEffect(() => {
        // Fetch interests from backend API
        axios.get('http://127.0.0.1:3001/api/interests')
            .then(response => {
                console.log('Interests:', response.data);
                setInterests(response.data.interests);
            })
            .catch(error => {
                console.error('Error fetching interests:', error);
            });
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Check if any required field is empty
        const requiredFields = ['interestid', 'header', 'description', 'visibility'];
        const emptyFields = requiredFields.filter(field => !formData[field]);

        if (emptyFields.length > 0) {
            alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
            return;
        }

        try {
            // Hardcoded userId
            const userId = "0001";

            // Prepare data to send to the backend including userId
            const dataToSend = { ...formData, userId };
            await axios.post('http://localhost:8080/api/posts', dataToSend);
            alert('Post created successfully');
            // Clear form fields after successful submission
            setFormData({
                interestid: null,
                interestName: '',
                header: '',
                description: '',
                visibility: ''
            });
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="interest">Interest:</label>
                <select id="interest" name="interestid" value={formData.interestid || ''} onChange={handleChange}>
                    <option value="">Choose a interest</option>
                    {interests.map(interest => (
                        <option key={interest.interestid} value={interest.interestid}>{interest.interest}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="header">Header:</label>
                <input type="text" id="header" name="header" value={formData.header} style={{ fontWeight: 'bold' }} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="visibility">Visibility:</label>
                <select id="visibility" name="visibility" value={formData.visibility} onChange={handleChange}>
                    <option value="">Select Visibility</option>
                    <option value="Everyone">Everyone</option>
                    <option value="University">University</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PostForm;
