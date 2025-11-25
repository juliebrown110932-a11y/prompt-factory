import React, { useState } from 'react';
import DonationModal from './DonationModal';

export default function DonationSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-12 mb-8">
        {/* 分隔装饰 */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-400">⚡ ⚡ ⚡</span>
          </div>
        </div>

        {/* 简化的打赏区块 */}
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full font-medium shadow-lg transform transition hover:scale-105 hover:shadow-xl"
          >
            <span>投喂作者</span>
            <span className="text-lg animate-bounce">⚡</span>
          </button>

          <p className="text-xs text-gray-500 mt-3">
            用爱发电，掉落疯批人设 ✨
          </p>
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
