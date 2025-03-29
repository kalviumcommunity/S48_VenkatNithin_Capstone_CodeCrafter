import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoursePage1.css'; // Import the CSS for CoursePage1

const CoursePage1 = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course data from backend
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/course/67e4d158fd74e81d478cfe81'
        ); // Correct course ID
        setCourse(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching course data. Please try again later.');
        console.error('Error fetching course data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) return <div className="course-container">Loading...</div>;
  if (error) return <div className="course-container error-message">{error}</div>;

  return (
    <div className="course-container">
      <div className="course-box">
        <h1>{course.title}</h1>
        <p>{course.description}</p>

        {/* Display the course content */}
        <div className="course-content">
          <h3>Course Content</h3>
          <p>{course.data}</p>
        </div>

        {/* Embed YouTube video */}
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/88yQTzlmsiA"
            frameBorder="0"
            allowFullScreen
            title="Course Video"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CoursePage1;
