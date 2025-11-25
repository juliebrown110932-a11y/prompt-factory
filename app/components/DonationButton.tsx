import React, { useState } from 'react';
import DonationModal from './DonationModal';

export default function DonationButton() {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* 浮动按钮 - 改到左下角 */}
      <div
        className="fixed bottom-6 left-6 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setShowModal(true)}
          className="relative group"
          aria-label="投喂作者"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-lg flex items-center justify-center transform transition-all hover:scale-110">
            <span className="text-2xl">🧋</span>
          </div>

          {/* 悬浮提示 - 调整位置适配左侧 */}
          <div className={`absolute bottom-full left-0 mb-2 transition-all transform ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
            <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
              <div className="font-bold">投喂作者 ⚡</div>
              <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          </div>

          {/* 脉冲动画 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 animate-ping opacity-30"></div>
        </button>
      </div>

      <DonationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        trigger="button"
      />
    </>
  );
}
