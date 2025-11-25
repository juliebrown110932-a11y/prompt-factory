import React, { useState } from 'react';
import DonationModal from './DonationModal';

export default function DonationSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-12 mb-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-400">⚡ ⚡ ⚡</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-4">
              <span className="inline-block animate-bounce">⚡</span>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              用爱发电中
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              投喂作者掉落更多惊喜人设~ ✨<br/>
              你的支持是我持续更新的动力！
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full font-medium shadow-lg transform transition hover:scale-105"
            >
              <span>投喂作者</span>
              <span>💝</span>
            </button>

            <p className="text-xs text-gray-500 mt-4">
              每一份支持都会被珍惜 💕
            </p>
          </div>
        </div>
      </div>

      <DonationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        trigger="result"
      />
    </>
  );
}
