import React, { useEffect } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: 'result' | 'button';
}

export default function DonationModal({ isOpen, onClose, trigger = 'button' }: DonationModalProps) {

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && (window as any)._hmt) {
      (window as any)._hmt.push(['_trackEvent', 'donation', 'view', trigger]);
    }
  }, [isOpen, trigger]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl p-6">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="关闭"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 标题 */}
        <div className="text-center mb-4">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            用爱发电中
          </h3>
          <p className="text-gray-600 text-sm">
            投喂作者掉落疯批人设~ ✨
          </p>
        </div>

        {/* 二维码区域 - 简化版 */}
        <div className="flex justify-center mb-4">
          <img
            src="/donation-qr.png"
            alt="打赏二维码"
            className="max-w-full h-auto rounded-lg"
            style={{ maxHeight: '200px' }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        {/* 底部文案 - 带晃动奶茶 */}
        <p className="text-center text-gray-600 text-sm">
          如果觉得用着不错，要不要请杯奶茶？
          <span className="inline-block ml-1 animate-shake text-lg">🧋</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: rotate(-8deg); }
          25% { transform: rotate(8deg); }
          50% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        .animate-shake {
          animation: shake 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
