import React from 'react';
import '../Components/HomePage.css';

function Homepage() {
  return (
    <div className="homepage">
      <header className="header">
        <h1>CODECRAFTER</h1>
        <div className="auth-buttons">
          <button className="login-button">Login</button>
          <button className="register-button">Register</button>
        </div>
      </header>

      <section className="hero">
        <h2>Unlock your game development potential</h2>
        <button className="enroll-button">Enroll now</button>
      </section>

      <section className="features">
        <h3>Unlock the Power of Codecrafter Features</h3>
        <div className="feature-cards">
          <div className="feature-card">
            <h4>Comprehensive Course Curriculum</h4>
            <p>Learn game development from scratch with our structured and detailed courses.</p>
          </div>
          <div className="feature-card">
            <h4>Resource Library</h4>
            <p>Access a wide range of resources including tutorials, tools, and articles to enhance your learning experience.</p>
          </div>
          <div className="feature-card">
            <h4>Engaging Discussion Forums</h4>
            <p>Participate in active discussions, ask questions, share insights, and collaborate with other learners.</p>
          </div>
          <div className="feature-card">
            <h4>Expert Instructors</h4>
            <p>Get guidance and mentorship from industry professionals with years of experience in game development.</p>
          </div>
        </div>
      </section>

      <section className="faq">
        <h3>Common Questions</h3>
        <div className="faq-questions">
          <div>
            <h4>What is Codecrafter?</h4>
            <p>Codecrafter is a game development course site that offers a comprehensive curriculum, resource library, and discussion forums for aspiring game developers.</p>
          </div>
          <div>
            <h4>Who can benefit from Codecrafter courses?</h4>
            <p>Codecrafter courses are designed for beginners and intermediate-level game developers looking to enhance their skills and knowledge in game development.</p>
          </div>
          <div>
            <h4>How do I access the course curriculum?</h4>
            <p>Once you enroll in a course on Codecrafter, you will gain access to the course curriculum, which includes video lessons, assignments, and quizzes.</p>
          </div>
          <div>
            <h4>What resources are available in the library?</h4>
            <p>The resource library on Codecrafter contains a variety of tools, guides, and templates that can be used to enhance your game development projects.</p>
          </div>
          <div>
            <h4>Can I interact with other students on Codecrafter?</h4>
            <p>Yes, Codecrafter provides discussion forums where students can interact, ask questions, and collaborate with each other on game development projects.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>CODECRAFTER</p>
        <p>Contact | Privacy Policy | Terms of Service | About</p>
      </footer>
    </div>
  );
}

export default HomePage;
