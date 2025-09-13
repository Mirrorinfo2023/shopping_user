'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  FaHeart,
  FaCommentDots,
  FaShareAlt,
  FaPlus,
  FaEllipsisV,
  FaTimes,
} from 'react-icons/fa';

const sampleStories = [
  { id: 1, user: 'Alice', image: '/story1.jpg' },
  { id: 2, user: 'Bob', image: '/story2.jpg' },
  { id: 3, user: 'Charlie', image: '/story3.jpg' },
  { id: 4, user: 'Daisy', image: '/story4.jpg' },
];

const samplePosts = [
  {
    id: 1,
    user: 'Alice',
    userImg: '/user1.jpg',
    postImg: '/post1.jpg',
    caption: 'Sunset vibes 🌅',
    likes: 120,
    comments: 8,
    shares: 43,
  },
  {
    id: 2,
    user: 'Bob',
    userImg: '/user2.jpg',
    postImg: '/post2.jpg',
    caption: 'Adventure time 🎕️',
    likes: 95,
    comments: 12,
    shares: 37,
  },
  {
    id: 3,
    user: 'Charlie',
    userImg: '/user3.jpg',
    postImg: '/post3.jpg',
    caption: 'Love this place 💙',
    likes: 150,
    comments: 20,
    shares: 54,
  },
];

const sampleReels = [
  { id: 1, image: '/reel1.jpg' },
  { id: 2, image: '/reel2.jpg' },
  { id: 3, image: '/reel3.jpg' },
  { id: 4, image: '/reel4.jpg' },
  { id: 5, image: '/reel5.jpg' },
  { id: 6, image: '/reel6.jpg' },
  { id: 7, image: '/reel7.jpg' },
];

export default function SocialMediaPage() {
  const router = useRouter();
  const [activeStory, setActiveStory] = useState(null);
  const [showFabOptions, setShowFabOptions] = useState(false);

  const openStory = (story) => setActiveStory(story);
  const closeStory = () => setActiveStory(null);

  return (
    <div className="bg-gray-50 min-h-screen p-4 pt-10">
      {/* Stories */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        <div
          className="flex flex-col items-center cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Add your story"
          onClick={() => alert('Add Your Story clicked')}
          onKeyDown={(e) => e.key === 'Enter' && alert('Add Your Story clicked')}
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <FaPlus className="text-blue-600" />
          </div>
          <span className="text-xs mt-1">Your Story</span>
        </div>
        {sampleStories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`View story by ${story.user}`}
            onClick={() => openStory(story)}
            onKeyDown={(e) => e.key === 'Enter' && openStory(story)}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500">
              <Image
                src={story.image}
                alt={`${story.user}'s story`}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <span className="text-xs mt-1">{story.user}</span>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {samplePosts.slice(0, 3).map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Image
                  src={post.userImg}
                  alt={`${post.user} profile`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="ml-3 font-semibold text-gray-800">{post.user}</span>
              </div>
              <FaEllipsisV
                className="text-gray-500 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="More options"
              />
            </div>
            <div className="relative w-full h-60 rounded overflow-hidden mb-2">
              <Image
                src={post.postImg}
                alt={post.caption}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-start gap-6 text-sm text-gray-600 mb-1">
              <div className="flex items-center gap-1" aria-label={`${post.likes} likes`}>
                <FaHeart className="text-red-500" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1" aria-label={`${post.comments} comments`}>
                <FaCommentDots className="text-blue-500" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center gap-1" aria-label={`${post.shares} shares`}>
                <FaShareAlt className="text-green-500" />
                <span>{post.shares}</span>
              </div>
            </div>
            <p className="text-sm text-gray-800 mt-1">
              <span className="font-bold mr-1">{post.user}</span>
              {post.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Reels Grid (2x2) */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        {sampleReels.slice(0, 4).map((reel) => (
          <div
            key={reel.id}
            className="w-full h-40 bg-gray-200 rounded-xl overflow-hidden relative cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Open reel"
            onClick={() => router.push('/social/reels')}
            onKeyDown={(e) => e.key === 'Enter' && router.push('/social/reels')}
          >
            <Image
              src={reel.image}
              alt="Reel"
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Reels Banner (Horizontal Scroll) */}
      <div className="mt-6 overflow-x-auto flex gap-4 pb-2">
        {sampleReels.slice(4).map((reel) => (
          <div
            key={reel.id}
            className="min-w-[200px] h-40 rounded-xl overflow-hidden bg-gray-200"
          >
            <Image
              src={reel.image}
              alt="Reel Banner"
              width={200}
              height={160}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {activeStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeStory}
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
        >
          <div
            className="w-72 h-96 relative rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl z-50"
              aria-label="Close story"
              onClick={closeStory}
            >
              <FaTimes />
            </button>
            <Image
              src={activeStory.image}
              alt={`${activeStory.user}'s story`}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowFabOptions(true)}
          className="w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg flex items-center justify-center hover:bg-blue-700"
          title="Create"
          aria-label="Open create menu"
        >
          <FaPlus />
        </button>
      </div>

      {/* FAB Options Modal */}
      {showFabOptions && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50"
          onClick={() => setShowFabOptions(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="fab-options-title"
        >
          <div
            className="bg-white rounded-lg shadow-xl p-4 mb-20 mr-6 w-64"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="fab-options-title"
              className="font-semibold text-lg mb-4 text-gray-800"
            >
              Create New
            </h3>
            <div className="flex flex-col gap-3">
              <button
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 text-left"
                onClick={() => {
                  setShowFabOptions(false);
                  alert('Add Post Clicked');
                }}
              >
                Add Post
              </button>
              <button
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 text-left"
                onClick={() => {
                  setShowFabOptions(false);
                  alert('Add Reel Clicked');
                }}
              >
                Add Reel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
