'use client';
import React from 'react';
import Image from 'next/image';
import {
  FaEye,
  FaHeart,
  FaCommentDots,
  FaShareAlt,
  FaShoppingBag,
} from 'react-icons/fa';

const reelsData = [
  {
    id: 1,
    username: '@dance_star',
    profileImage: '/user1.jpg',
    dateTime: '30 Jun 2025, 18:19',
    caption: 'Practicing daily 💃 Practicing daily 💃 Practicing daily 💃 Practicing daily 💃',
    videoThumbnail: '/reel1.jpg',
    views: 123,
    likes: 456,
    comments: 78,
    shares: 90,
    products: [139, 139, 139, 139],
  },
  {
    id: 2,
    username: '@music_lover',
    profileImage: '/user2.jpg',
    dateTime: '28 Jun 2025, 21:10',
    caption: 'Music heals the soul 🎶 🎵 🎧',
    videoThumbnail: '/reel2.jpg',
    views: 312,
    likes: 587,
    comments: 54,
    shares: 110,
    products: [249, 199, 129, 359],
  },
];

export default function ReelsPage() {
  return (
    <div className="h-screen w-full bg-black text-white overflow-y-auto">
      {reelsData.map((reel) => (
        <div key={reel.id} className="relative h-screen w-full overflow-hidden">
          {/* Background image or video */}
          <Image
            src={reel.videoThumbnail}
            alt="Reel"
            layout="fill"
            objectFit="cover"
            className="z-0 opacity-90"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
            {/* Top */}
            <div className="flex items-center gap-2">
              <Image
                src={reel.profileImage}
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-bold">{reel.username}</p>
                <p className="text-xs text-gray-300">{reel.dateTime}</p>
              </div>
            </div>

            {/* Bottom */}
            <div className="w-full">
              <p className="text-sm leading-tight">{reel.caption}</p>
              <p className="text-blue-400 text-xs cursor-pointer mt-1">
                View More
              </p>

              {/* Products */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {reel.products.map((price, i) => (
                  <div
                    key={i}
                    className="bg-white bg-opacity-20 rounded-lg p-2 flex flex-col items-center justify-center"
                  >
                    <FaShoppingBag className="text-white text-xl mb-1" />
                    <span className="text-sm font-semibold">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="absolute right-4 top-1/3 space-y-5 text-white text-center z-20">
            <div>
              <FaEye className="mx-auto text-xl" />
              <p className="text-xs">{reel.views}</p>
            </div>
            <div>
              <FaHeart className="mx-auto text-xl" />
              <p className="text-xs">{reel.likes}</p>
            </div>
            <div>
              <FaCommentDots className="mx-auto text-xl" />
              <p className="text-xs">{reel.comments}</p>
            </div>
            <div>
              <FaShareAlt className="mx-auto text-xl" />
              <p className="text-xs">{reel.shares}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
