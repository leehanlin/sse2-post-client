import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'; // Import your CSS file

const PostForm = () => {
    const [formData, setFormData] = useState({
        categoryId: null, // Store category ID
        categoryName: '', // Store category name
        header: '',
        description: '',
        tags: '',
        visibility: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from backend API
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                console.log('Categories:', response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Check if any required field is empty
        const requiredFields = ['categoryId', 'header', 'description', 'visibility'];
        const emptyFields = requiredFields.filter(field => !formData[field]);

        if (emptyFields.length > 0) {
            alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/posts', formData);
            alert('Post created successfully');
            // Clear form fields after successful submission
            setFormData({
                categoryId: null,
                categoryName: '',
                header: '',
                description: '',
                tags: '',
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
                <label htmlFor="category">Category:</label>
                <select id="category" name="categoryId" value={formData.categoryId || ''} onChange={handleChange}>
                    <option value="">Choose a category</option>
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>{category.category}</option>
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
                <label htmlFor="tags">Tags:</label>
                <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
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
