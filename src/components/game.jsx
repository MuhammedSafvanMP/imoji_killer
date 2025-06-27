// VirusGame.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import virusSound from "../assets/buble.mp3";
import { useNavigate } from "react-router-dom";



const levels = [
  { speed: 3000, count: 3, type: "🦠" },
  { speed: 2000, count: 4, type: "🤒"  },
  { speed: 1500, count: 5, type: "💊"  },
  { speed: 1200, count: 6, type: "☣️"  },
  { speed: 1000, count: 7, type: "🧬" },
];

function VirusGame() {
  const [score, setScore] = useState(0);
  const [viruses, setViruses] = useState([]);
  const [level, setLevel] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [adStep, setAdStep] = useState(0);
  const virusId = useRef(0);
  const virusAudio = useRef(null);
  const navigate = useNavigate();

  const spawnViruses = () => {
    const { count } = levels[level % levels.length];
    const newViruses = Array.from({ length: count }, () => ({
      id: virusId.current++,
      x: Math.random() * 90,
      y: Math.random() * 90,
      type: levels[Math.floor(Math.random() * levels.length)].type,
    }));
    setViruses(newViruses);
  };

  const startLevel = () => {
    spawnViruses();
  };

  const handleVirusClick = (id) => {
    setViruses((prev) => prev.filter((v) => v.id !== id));
    setScore((prev) => prev + 1);
    if (virusAudio.current) {
      virusAudio.current.currentTime = 0;
      virusAudio.current.play();
    }
  };

  useEffect(() => {
    if (viruses.length === 0 && score !== 0 && !showAd) {
      setShowAd(true);
      setAdStep(1);
    }
  }, [viruses]);

  const handleAdContinue = () => {
    if (adStep === 1) {
      setAdStep(2);
    } else {
      setShowAd(false);
      setAdStep(0);
      const nextLevel = level + 1;
      setLevel(nextLevel);
      startLevel();
    }
  };

  useEffect(() => {
    startLevel();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-6 font-sans">
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">🧫 Imoji Killer</h2>
          <button
            className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => navigate("/redeem")}
          >
            Redeem
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <p className="text-lg font-medium">Score: {score}</p>
          <p className="text-lg font-medium">Level: {level + 1}</p>
        </div>

        <div className="relative w-full h-[400px] border-4 border-blue-600 bg-blue-100 rounded-xl overflow-hidden">
          {viruses.map((virus) => (
            <motion.div
              key={virus.id}
              className="absolute cursor-pointer"
              style={{ left: `${virus.x}%`, top: `${virus.y}%` }}
              onClick={() => handleVirusClick(virus.id)}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
            >
              {typeof virus.type === "string" ? (
                <span className="text-4xl">{virus.type}</span>
              ) : (
                <img src={virus.type} alt="virus" className="w-10 h-10" />
              )}
            </motion.div>
          ))}
        </div>

        {showAd && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-md p-6 rounded-xl text-center shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {adStep === 1 ? "📺 Ad 1" : "📺 Ad 2"}
              </h3>
              <video
                className="w-full rounded mb-4"
                autoPlay
                controls
                onEnded={handleAdContinue}
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support video.
              </video>
            </div>
          </div>
        )}
      </div>

      <audio ref={virusAudio} src={virusSound} preload="auto" />
    </div>
  );
}

export default VirusGame;
