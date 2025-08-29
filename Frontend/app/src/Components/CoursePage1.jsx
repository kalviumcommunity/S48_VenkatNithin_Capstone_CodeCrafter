import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoursePage1.css';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import supabase from '../supabase';

const CoursePage1 = () => {
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const courseId = '67e4d158fd74e81d478cfe81';

  // Fetch user ID from Supabase auth
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      } else {
        console.error('No user logged in or error:', error);
      }
    };

    getUser();
  }, []);

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/course/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        setError('Error fetching course data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  // Fetch comments for this course
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <div className="course-container">Loading...</div>;
  if (error) return <div className="course-container error-message">{error}</div>;

  return (
    <>
      {/* CODECRAFTER top banner */}
      <div style={{ textAlign: 'center', padding: '15px 0', fontWeight: 'bold', fontSize: '24px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
        CODECRAFTER
      </div>

      <div className="course-container">
        <div className="course-box">

          <h1>{course.title}</h1>
          <p>{course.description}</p>

          {/* Display the course content */}
          <div className="course-content">
            <h3>Course Content</h3>
            <p><strong>Intro</strong><br />
              If you want to make a <em>videogame</em> but don't know where to start, this video should help point you in the right direction.<br />
              Making games is a complicated subject, but let's try and break it down.<br />
              When the big studios create games, they do so in large teams. Each person has a specific role—whether that be 3D modeling, programming, concept art, or sound design.<br />
              In reality though, most people don’t start with a team of professionals—more just a single laptop and some good ideas. That’s at least how I got into it.<br />
              Luckily, over the last few years, there's been a big boom in the indie games industry.<br />
              Now small teams or even individuals can make hugely popular games, such as <em>SUPERHOT</em> and <em>Undertale</em>, just to name a few.
            </p>

            <p><strong>Game Engines</strong><br />
              Every video game runs on what is called a game engine.<br />
              The engine is what tells the computer how to render graphics or play audio.<br />
              Games such as <em>Half-Life 2</em>, <em>Counter-Strike</em>, and <em>Portal</em> all run on the <em>Source</em> engine, which is why they have many similarities in physics, graphics quality, and gameplay.<br />
              Previously, studios had to either build an engine from scratch or purchase one, which was expensive.<br />
              But now many independent engines are available for developers to build their games on.
            </p>

            <p><strong>Choosing an Engine</strong><br />
              So what engine should you choose? The answer is: it depends.<br />
              There are many options, each with strengths and weaknesses.<br />
              If you’re interested in 2D games and want something easy to start with, I recommend GameMaker.<br />
              Examples made with GameMaker include <em>Spelunky</em>, <em>Undertale</em>, and <em>INK</em>.<br />
              GameMaker is essentially free, but some features require a license. The free version only exports to Windows.<br />
              Unity allows you to build both 2D and 3D games and export to many platforms.<br />
              It powers games like <em>Hearthstone</em>, <em>Superhot</em>, and <em>Kerbal Space Program</em>.<br />
              It’s also widely used by mobile developers.<br />
              Unreal Engine is likely the most advanced. It’s great for experienced developers making 3D games, but I wouldn’t recommend it for beginners.<br />
              It powers heavy games like <em>Unreal Tournament</em>, <em>Gears of War</em>, and <em>Arkham Knight</em>.
            </p>

            <p>
              I’m a bit biased—my channel is built around Unity—but I do believe Unity is the perfect starting point for most developers.<br />
              Not because it’s perfect (no engine is), but because of its diversity.<br />
              Unity supports both 2D and 3D games and deploys to web, desktop, mobile, and consoles.<br />
              You can program in C# or JavaScript, two widely-used languages, making your skills transferable elsewhere.
            </p>
          </div>

          <div className="course-content">
            {/* Any additional course content */}
          </div>

          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/IlKaB1etrik"
              frameBorder="0"
              allowFullScreen
              title="Course Video"
            ></iframe>
          </div>

          {/* ---- Discussion Section ---- */}
          <div className="discussion-section">
            <h2>Discussion Forum</h2>

            {/* Comment submission */}
            {userId && (
              <CommentForm
                course_id={courseId}
                user_id={userId}
                onCommentSubmitted={fetchComments}
              />
            )}

            {/* Display existing comments */}
            <div className="comment-list">
              {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <p>{comment.comment}</p>
                    {comment.image_url && (
                      <img
                        src={comment.image_url}
                        alt="Comment attachment"
                        style={{ maxWidth: '200px', marginTop: '10px' }}
                      />
                    )}
                    <small>Posted on {new Date(comment.created_at).toLocaleString()}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage1;
