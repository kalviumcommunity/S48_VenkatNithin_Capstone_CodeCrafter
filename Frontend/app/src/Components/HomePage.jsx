import React from "react";
import "../Components/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <h1 className="logo">CODECRAFTER</h1>
        <nav className="nav">
          <a href="/login" className="nav-link">Login</a>
          <a href="/register" className="nav-button">Register</a>
        </nav>
      </header>
      
      <section className="hero">
        <h2>Unlock your game development potential</h2>
        <button className="enroll-button">Enroll now</button>
      </section>
      
      <section className="features">
        <p className="features-title">FEATURES</p> {/* New line added */}
        <h3>Unlock the Power of Codecrafter Features</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>Comprehensive Course Curriculum</h4>
            <p>Learn game development from scratch with our structured and detailed curriculum.</p>
          </div>
          <div className="feature">
            <h4>Resource Library</h4>
            <p>Access a vast library of resources including tutorials, tools, and assets to enhance your learning experience.</p>
          </div>
          <div className="feature">
            <h4>Engaging Discussion Forums</h4>
            <p>Participate in active discussions with peers, share insights, and collaborate on projects.</p>
          </div>
          <div className="feature">
            <h4>Expert Instructors</h4>
            <p>Gain guidance and mentorship from industry professionals with years of experience.</p>
          </div>
        </div>
      </section>

      <section className="join-section"> {/* New section added */}
        <h3>Join Codecrafter and Level Up Your Skills</h3>
      </section>

      <section className="faq">
        <div className="faq-content">
          <div className="faq-questions">
            <h4>Common Questions</h4>
          </div>
          <div className="faq-answers">
            <p><strong>What is Codecrafter?</strong><br />
            Codecrafter is a game development course site that offers a comprehensive curriculum, resource library, and discussion forums for aspiring game developers.</p>
            <p><strong>Who can benefit from Codecrafter courses?</strong><br />
            Codecrafter courses are designed for beginners and intermediate-level game developers looking to enhance their skills and knowledge in game development.</p>
            <p><strong>How do I access the course curriculum?</strong><br />
            Once you enroll in a course on Codecrafter, you will gain access to the course curriculum, which includes video lessons, assignments, and quizzes.</p>
            <p><strong>What resources are available in the library?</strong><br />
            The resource library on Codecrafter contains a variety of tools, assets, and templates that can be used to enhance your game development projects.</p>
            <p><strong>Can I interact with other students on Codecrafter?</strong><br />
            Yes, Codecrafter provides discussion forums where students can interact, ask questions, and collaborate with each other on game development projects.</p>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <p>CODECRAFTER</p>
        <nav className="footer-nav">
          <a href="/courses">Courses</a>
          <a href="/resource-library">Resource Library</a>
          <a href="/discussion-forums">Discussion Forums</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;