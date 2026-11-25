/* ML Tutor — adds Level 7 "Generative AI" (lessons in content/07-genai.js) to the learning path. */
(() => {
  const MLS = window.MLS;
  if (!MLS.LEVELS.some((l) => l.id === 'genai')) {
    MLS.LEVELS.push({
      id: 'genai', emoji: '🎨',
      title: { en: 'Generative AI: Images, Video, Voice & Music', ne: 'जेनेरेटिभ AI: चित्र, भिडियो, आवाज र संगीत', zh: '生成式 AI：图像、视频、语音与音乐' },
      desc: {
        en: 'How today\'s AI makes pictures, videos, voices and music, finds objects and understands speech — with simple demos and real platforms to practise on.',
        ne: 'आजको AI ले चित्र, भिडियो, आवाज र संगीत कसरी बनाउँछ, वस्तु कसरी भेट्छ र बोली कसरी बुझ्छ — सरल डेमो र अभ्यास गर्ने वास्तविक प्लेटफर्मसहित।',
        zh: '当今的 AI 如何生成图片、视频、声音和音乐，如何找出物体、听懂语音——配有简单演示和真实的练习平台。',
      },
    });
  }
})();
