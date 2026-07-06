module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AnnamPC Bot</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-900 text-white p-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-4">🚀 AnnamPC Bot</h1>
        <p class="text-xl text-gray-400 mb-8">Tăng traffic quốc tế - Boost SEO</p>
        
        <div class="grid md:grid-cols-3 gap-4 mb-8">
          <div class="bg-gray-800 p-6 rounded-xl">
            <div class="text-3xl font-bold text-blue-400">50+</div>
            <div class="text-gray-400">Quốc gia</div>
          </div>
          <div class="bg-gray-800 p-6 rounded-xl">
            <div class="text-3xl font-bold text-green-400">90,000</div>
            <div class="text-gray-400">Visits/ngày</div>
          </div>
          <div class="bg-gray-800 p-6 rounded-xl">
            <div class="text-3xl font-bold text-purple-400">⚡</div>
            <div class="text-gray-400">Tăng tốc SEO</div>
          </div>
        </div>
        
        <button onclick="startBot()" class="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-xl font-bold transition">
          🚀 BẮT ĐẦU TĂNG TRAFFIC
        </button>
        
        <div id="log" class="mt-8 bg-gray-800 p-4 rounded-xl text-left font-mono text-sm h-48 overflow-y-auto">
          <div class="text-green-400">✅ Bot sẵn sàng!</div>
        </div>
      </div>
      
      <script>
        function addLog(msg, color = 'text-green-400') {
          const log = document.getElementById('log');
          const time = new Date().toLocaleTimeString();
          log.innerHTML += \`<div class="\${color}">[\${time}] \${msg}</div>\`;
          log.scrollTop = log.scrollHeight;
        }
        
        async function startBot() {
          addLog('🚀 Đang chạy bot...', 'text-yellow-400');
          try {
            const res = await fetch('/api/bot');
            const data = await res.json();
            addLog(\`✅ \${data.message || 'Thành công!'}\`, 'text-green-400');
          } catch(e) {
            addLog(\`❌ Lỗi: \${e.message}\`, 'text-red-400');
          }
        }
        
        // Auto run on load
        startBot();
      </script>
    </body>
    </html>
  `);
};
