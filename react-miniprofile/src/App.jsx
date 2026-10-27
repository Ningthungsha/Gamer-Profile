import { useState, useEffect } from "react";
import { useTheme } from "./theme.js";
import "./App.css";

function App() {
  const { darkMode, toggleTheme } = useTheme();

  const [gamerName, setGamerName] = useState("");
  const [favoriteGame, setFavoriteGame] = useState("Valorant");
  const [xp, setXp] = useState(0);
  const [message, setMessage] = useState("");
  const increaseXP = () => {
  setXp((previousXP) => previousXP + 25);
};

  
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;


 useEffect(() => {
  if (xp === 0) return;

  const timer = setTimeout(() => {
    setMessage(` You earned XP! Total XP: ${xp}`);
  }, 100);

  const clearTimer = setTimeout(() => {
    setMessage("");
  }, 3000);

  return () => {
    clearTimeout(timer);
    clearTimeout(clearTimer);
  };
}, [xp]);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <header className="navbar">
        <h2 className="logo">ROEL<span>GAMER</span></h2>

        <button className="theme-button" onClick={toggleTheme}>
          {darkMode ? " Light Mode" : " Dark Mode"}
        </button>
      </header>

      <main className="profile-container">
        <div className="welcome-text">
          <p className="eyebrow">PLAYER DASHBOARD</p>
          <h1>Your Gaming <span>Profile</span></h1>
          <p className="subtitle">
            Level up, earn XP, and track your gaming journey.
          </p>
        </div>

        <section className="profile-card">
          <div className="avatar">🎮</div>

          <p className="card-label">GAMER IDENTITY</p>
          <h2>{gamerName.trim() || "Your Gamer Name"}</h2>

          <label htmlFor="gamerName">Enter your gamer name</label>
          <input
            id="gamerName"
            type="text"
            placeholder="e.g. ShadowHunter"
            value={gamerName}
            onChange={(event) => setGamerName(event.target.value)}
            maxLength={24}
          />

          <label htmlFor="favoriteGame">Choose your favorite game</label>
          <select
            id="favoriteGame"
            value={favoriteGame}
            onChange={(event) => setFavoriteGame(event.target.value)}
          >
            <option value="Valorant">Valorant</option>
            <option value="Minecraft">Minecraft</option>
            <option value="BGMI">BGMI</option>
            <option value="Free Fire">Free Fire</option>
            <option value="Fortnite">Fortnite</option>
            <option value="Call of Duty">Call of Duty</option>
          </select>

          <div className="game-display">
            <span> Favorite Game</span>
            <strong>{favoriteGame}</strong>
          </div>

          <div className="stats">
            <div className="stat-box">
              <span> CURRENT LEVEL</span>
              <strong>{level}</strong>
            </div>

            <div className="stat-box">
              <span> TOTAL XP</span>
              <strong>{xp}</strong>
            </div>
          </div>

          <div className="xp-section">
            <div className="xp-heading">
              <span>Level {level} progress</span>
              <span>{progress}/100 XP</span>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-label="XP progress to next level"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <button className="xp-button" onClick={increaseXP}>
           Earn 25 XP
          </button>

          

          <p className="message" aria-live="polite">{message}</p>
        </section>

        <p className="footer-text">
          KEEP PLAYING. KEEP GROWING. LEVEL UP! 
        </p>
      </main>
    </div>
  );
}

export default App;