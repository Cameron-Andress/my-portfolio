import React, { useState, useEffect } from "react";
import "./App.css";
import "./SectionStyles.css"; // Import the new CSS file for styling
import MiniGame from "./components/MiniGame/MiniGame"; // Import MiniGame Component

function App() {
  const [showGame, setShowGame] = useState(false); // State to toggle mini-game visibility
  const [showDescription, setShowDescription] = useState(false); // State to toggle the description popup visibility

  const closeDescriptionPopup = () => {
    setShowDescription(false); // Close the popup by setting the state to false
  };

  // Example data arrays for projects and accomplishments
  const projects = [
    {
      name: "Solar System Information App",
      link: "https://github.com/yourusername/solar-system-app",
      description:
        "Developed in Kotlin, displays the planets of the solar system with their distances from the Sun in kilometers and facts about each planet. Includes a link to Nasa.gov.",
    },
    {
      name: "Twitter Clone",
      link: "https://github.com/yourusername/twitter-clone",
      description:
        "A simplified version of Twitter (now X) using PHP, JavaScript, and MySQL. Features user authentication, post creation, and real-time updates.",
    },
    {
      name: "DnD Random Number Generator",
      link: "https://github.com/yourusername/dnd-rng",
      description:
        "A simple C++ program that demonstrates how random number generation (RNG) works for games like Dungeons & Dragons.",
    },
  ];

  const accomplishments = [
    "Associate's Degree in Software Engineering",
    "Associate's Degree in Arts",
    "Certificate for UoM Python For Everyone course",
    "Certificate for SDG Academy Climate Change: The Science and Global Impact course",
    "Certificate for OCC System Analysis and Design course",
  ];

  useEffect(() => {
    const keyCombination = { ctrl: false, shift: false, g: false };

    // Keydown event to detect "Ctrl + Shift + G"
    const handleKeyDown = (e) => {
      if (e.ctrlKey) keyCombination.ctrl = true;
      if (e.shiftKey) keyCombination.shift = true;
      if (e.key.toLowerCase() === "g") keyCombination.g = true;

      // Trigger the mini-game when all keys are pressed
      if (keyCombination.ctrl && keyCombination.shift && keyCombination.g) {
        setShowGame(true);
      }
    };

    // Reset the keys when released
    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === "control") keyCombination.ctrl = false;
      if (e.key.toLowerCase() === "shift") keyCombination.shift = false;
      if (e.key.toLowerCase() === "g") keyCombination.g = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div>
      {/* VHS Effects */}
      <div className="noise-overlay"></div>
      <div className="scanlines"></div>
      <div className="vhs-effect"></div>

      {/* Retro Grid */}
      <div className="grid"></div>

      {/* Conditional Rendering: Show mini-game or main content */}
      {showGame ? (
        <>
          <MiniGame />
          <button
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              padding: "10px 15px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => setShowGame(false)}
          >
            Back to Portfolio
          </button>
        </>
      ) : (
        <>
          {/* Main Content */}
          <main>
            <header>
              <h1>Welcome to My Retro Portfolio</h1>
              <p>Your journey to my coding greatness begins here.</p>
            </header>

            {/* About Me Section */}
            <section id="about-me" className="section">
              <h2>About Me</h2>
              <div className="about-content">
                <img
                  src="/images/my-photo.jpg"
                  alt="A picture of me"
                  className="profile-pic"
                />
                <p>
                  Hi! I'm Cameron Andress, a passionate developer with a love for
                  retro-inspired designs and cutting-edge technologies. I love video-game design, travel, cooking, programming, and astronomy. Welcome to
                  my portfolio!
                </p>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section">
              <h2>My Projects</h2>
              <div className="projects-container">
                {projects.map((project, index) => (
                  <div className="project-card" key={index}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                    <button
                      onClick={() => setShowDescription(true)}
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#008CBA",
                        color: "#fff",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Show Description
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Description Popup */}
            {showDescription && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <p>Project Description goes here...</p>
                  <button
                    onClick={closeDescriptionPopup}
                    style={{
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Close Description
                  </button>
                </div>
              </div>
            )}

            {/* Accomplishments Section */}
            <section id="accomplishments" className="section">
              <h2>Accomplishments</h2>
              <ul>
                {accomplishments.map((accomplishment, index) => (
                  <li key={index}>{accomplishment}</li>
                ))}
              </ul>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
