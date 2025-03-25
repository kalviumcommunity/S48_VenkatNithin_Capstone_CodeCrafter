import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To redirect to HomePage after deletion

  // Fetch current user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          throw new Error('User email not found in localStorage. Please log in again.');
        }

        const response = await axios.get(`http://localhost:3000/api/profile/${email}`);
        setUserDetails(response.data);
        setFormData({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
        });
        setError(null);
      } catch (err) {
        setError(err.message || 'Error fetching user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle save changes
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/profile/${userDetails.email}`, formData);
      setUserDetails(response.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again later.');
    }
  };

  // Handle delete user
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/profile/${userDetails.email}`);
        localStorage.removeItem('userEmail'); // Clear localStorage
        alert('Profile deleted successfully.');
        navigate('/'); // Redirect to HomePage after deletion
      } catch (err) {
        console.error('Error deleting profile:', err);
        alert('Failed to delete profile. Please try again later.');
      }
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setFormData({
      name: userDetails.name,
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
    });
    setIsEditing(false);
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="Profile-container">
      <h1>Welcome to Your Profile</h1>
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <div className="button-container">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="view-container">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <div className="button-container">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
