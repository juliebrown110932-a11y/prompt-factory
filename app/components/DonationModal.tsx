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
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 标题 */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            用爱发电中
          </h3>
          <p className="text-gray-600 text-sm">
            投喂作者掉落更多惊喜人设~ ✨
          </p>
        </div>

        {/* 二维码区域 */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 mb-4">
          <img
            src="/donation-qr.png"
            alt="打赏二维码"
            className="w-48 h-48 mx-auto rounded-lg"
            onContextMenu={(e) => e.preventDefault()}
          />

          <p className="text-center text-xs text-gray-500 mt-3">
            📱 长按识别二维码<br/>
            💻 微信/支付宝扫码
          </p>
        </div>

        {/* 金额建议 */}
        <div className="flex justify-around mb-4 text-xs">
          <div className="text-center">
            <div className="text-lg mb-1">🧋</div>
            <div className="text-gray-600">随意</div>
            <div className="text-gray-400">一杯奶茶</div>
          </div>
          <div className="text-center">
            <div className="text-lg mb-1">🍜</div>
            <div className="text-gray-600">随缘</div>
            <div className="text-gray-400">一顿简餐</div>
          </div>
          <div className="text-center">
            <div className="text-lg mb-1">💝</div>
            <div className="text-gray-600">随心</div>
            <div className="text-gray-400">都是心意</div>
          </div>
        </div>

        {/* 底部温馨提示 */}
        <p className="text-center text-xs text-gray-400 mt-4">
          如果觉得用着不错，要不要请杯奶茶？❤️<br/>
          每一份投喂都会激励作者解锁更多人设~
        </p>
      </div>
    </div>
  );
}
