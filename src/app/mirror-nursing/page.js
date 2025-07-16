'use client';

import Image from 'next/image';
import "../globals.css";

const MirrorNursing = () => {
  const features = [
    "Live and recorded nursing classes",
    "Daily quizzes and weekly mock tests",
    "Study material aligned with latest nursing syllabus",
    "Expert faculty and mentorship support",
    "Progress tracking and analytics dashboard",
    "Offline downloads for low-data users",
    "Doubt-clearing sessions with real-time chat",
    "Scholarship and certificate programs",
  ];

  const valuePoints = [
    "Improves Subject Understanding",
    "Builds Exam Confidence",
    "Encourages Discipline and Regular Practice",
    "Supports Career Advancement and Job Placement",
    "Develops Practical & Theoretical Knowledge",
  ];

  const platforms = [
    "Android (Google Play Store)",
    "iOS (App Store)",
    "Web Browser",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 sm:p-10 text-gray-800">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
        Mirror Nursing
      </h1>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 bg-white shadow-lg rounded-2xl p-6 md:p-10 mb-12">
        <div className="flex-1 space-y-4">
          <p className="text-lg leading-relaxed">
            <strong className="text-blue-700">Mirror Nursing</strong> is a revolutionary digital platform designed to support nursing students and professionals. Access curated study materials, attend live classes, and participate in mock tests tailored to various nursing entrance and licensing exams.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/img_5.png"
            alt="Mirror Nursing"
            width={400}
            height={250}
            className="rounded-lg shadow"
          />
        </div>
      </div>

      {/* Description Paragraphs */}
      <div className="space-y-6 max-w-4xl mx-auto mb-10 text-base md:text-lg">
        <p>
          Mirror Nursing brings the best of nursing education directly to your device, breaking location and resource barriers for aspiring nurses.
        </p>
        <p>
          With interactive video lessons, structured learning paths, and expert mentorship, learners gain both academic confidence and practical skillsets aligned with healthcare industry demands.
        </p>
      </div>

      {/* Feature Section */}
      <Section title="Key Features" items={features} />

      {/* Educational Value Section */}
      <Section title="Educational & Developmental Value" items={valuePoints} />

      {/* Platform Section */}
      <Section title="Platforms Available On" items={platforms} />

      {/* Final CTA */}
      <div className="text-center mt-16">
        <p className="text-lg mb-6">
          Join thousands of aspiring and working nurses already upgrading their learning with Mirror Nursing.
        </p>
        <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition">
          Start Learning Today
        </button>
      </div>
    </div>
  );
};

// Reusable List Section Component
const Section = ({ title, items }) => (
  <section className="max-w-4xl mx-auto mb-14">
    <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6">{title}</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((text, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <div className="w-2.5 h-2.5 mt-2 rounded-full bg-purple-600" />
          <span className="text-gray-700">{text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default MirrorNursing;
