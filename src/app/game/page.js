'use client';

import Image from 'next/image';
import "../globals.css";

const MirrorGame = () => {
  const features = [
    "Real-time multiplayer gaming experience",
    "Daily and weekly rewards",
    "Secure wallet integration for entry fees and winnings",
    "In-game chat and friend invitations",
    "Leaderboards to track top players",
    "Simple and engaging user interface",
    "Instant withdrawal to Mirror Wallet",
    "No ads during gameplay for a smooth experience",
  ];

  const educational = [
    "Improves Logical Thinking",
    "Enhances Problem Solving Skills",
    "Boosts Memory and Attention",
    "Encourages Strategic Planning",
    "Promotes Healthy Competition",
    "Teaches Time Management",
  ];

  const platforms = [
    "Android (Google Play Store)",
    "iOS (App Store)",
    "Web Browser",
    "Windows (PWA/Desktop App)",
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-10 lg:px-24 text-gray-800">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">🎮 Mirror Game</h1>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
        <div className="lg:w-1/2">
          <p className="text-lg leading-relaxed mb-4">
            Welcome to <strong>Mirror Game</strong> — an exciting, interactive way to earn while you play! Compete in daily challenges, sharpen your skills, and climb the leaderboard to unlock cashback, Mirror Points, and exclusive rewards.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow transition">
            ▶ Play Now
          </button>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="/img_3.png"
            alt="Mirror Game"
            width={400}
            height={250}
            className="rounded-xl shadow-md"
          />
        </div>
      </div>

      <div className="space-y-6 text-base leading-relaxed text-gray-700">
        <p>
          Mirror Game is an innovative gaming platform integrated within the Mirror ecosystem, aiming to redefine how users interact with digital entertainment.
        </p>
        <p>
          Designed for all age groups, Mirror Game isnt just about entertainment — it’s also about learning, improving reflexes, and winning rewards. Enjoy quizzes, puzzles, reflex challenges, and arcade adventures — all without ads!
        </p>
        <p>
          Whether you’re unwinding after a busy day or challenging your friends, Mirror Game brings communities together through smart play and daily rewards.
        </p>
      </div>

      {/* Sections */}
      <Section title=" Key Features" items={features} />
      <Section title=" Educational & Developmental Value" items={educational} />
      <Section title=" Platforms Available On" items={platforms} />

      <p className="mt-8 text-center text-gray-600 italic">
        Whether you are looking to have fun, sharpen your mind, or earn rewards — Mirror Game has something for everyone.
      </p>
    </div>
  );
};

const Section = ({ title, items }) => (
  <div className="mt-12">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">{title}</h2>
    <ul className="space-y-3 pl-4 border-l-4 border-blue-300">
      {items.map((item, idx) => (
        <li key={idx} className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-blue-500 text-gray-700">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default MirrorGame;
