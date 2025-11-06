export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl w-full">
        {/* 主标题 - 移动端优先 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight px-2">
          AI伴侣调教工坊
        </h1>

        {/* 副标题 - 移动端优先 */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 px-4">
          专为乙女和RP爱好者打造的提示词生成器
        </p>

        {/* 简短描述 - 增加信息层次 */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 px-4 max-w-2xl mx-auto">
          通过简单点选，一键生成高质量AI角色扮演提示词
        </p>

        {/* 占位按钮区域 - 为后续功能预留 */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-h-[56px] min-w-[200px] active:scale-95">
            开始创作
          </button>
        </div>

        {/* 特性标签 - 移动端友好的展示 */}
        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
          <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm text-gray-700 shadow-sm">
            🎭 多种人设
          </span>
          <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm text-gray-700 shadow-sm">
            🌍 丰富世界观
          </span>
          <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm text-gray-700 shadow-sm">
            💝 关系动态
          </span>
        </div>
      </div>
    </main>
  );
}
