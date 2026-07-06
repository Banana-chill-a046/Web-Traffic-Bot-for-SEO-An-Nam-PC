module.exports = async (req, res) => {
  // Cho phép mọi request
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Gửi HTML luôn, không cần file riêng
  res.setHeader('Content-Type', 'text/html');
  
  res.status(200).send(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🚀 AnnamPC SEO Bot</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); min-height: 100vh; }
        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
        .flag-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(65px,1fr)); gap: 8px; }
        .flag-item { text-align: center; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 10px; cursor: pointer; transition: 0.3s; }
        .flag-item:hover { background: rgba(79,172,254,0.2); transform: scale(1.05); }
        .flag-item .flag { font-size: 1.8rem; display: block; }
        .flag-item .name { font-size: 0.6rem; color: #94a3b8; }
    </style>
</head>
<body class="text-white p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10">
            <div class="text-6xl mb-4">🚀</div>
            <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AnnamPC Bot
            </h1>
            <p class="text-gray-400 mt-2">🌍 Tăng traffic quốc tế - Tối ưu SEO toàn cầu</p>
            <div class="flex justify-center gap-2 flex-wrap mt-4">
                <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">✅ Đang hoạt động</span>
                <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">🌐 50+ quốc gia</span>
                <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">⚡ 90k visits/ngày</span>
            </div>
        </div>

        <!-- Controls -->
        <div class="glass rounded-2xl p-6 mb-8">
            <div class="grid md:grid-cols-4 gap-4">
                <div>
                    <label class="text-sm text-gray-400">🎯 Mục tiêu</label>
                    <input type="number" id="target" value="90000" class="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white" />
                </div>
                <div>
                    <label class="text-sm text-gray-400">🏳️ Quốc gia</label>
                    <select id="countries" class="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white">
                        <option value="50">50 nước</option>
                        <option value="30">30 nước</option>
                        <option value="10">10 nước</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm text-gray-400">⚡ Tốc độ</label>
                    <select id="concurrent" class="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white">
                        <option value="50">Turbo (50)</option>
                        <option value="30">Nhanh (30)</option>
                        <option value="10">Vừa (10)</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button onclick="startBot()" id="btnStart" class="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-bold hover:scale-105 transition">
                        🚀 CHẠY
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="glass rounded-2xl p-4 text-center">
                <div class="text-3xl font-bold text-blue-400" id="totalVisits">0</div>
                <div class="text-sm text-gray-400">Tổng visits</div>
            </div>
            <div class="glass rounded-2xl p-4 text-center">
                <div class="text-3xl font-bold text-green-400" id="successVisits">0</div>
                <div class="text-sm text-gray-400">Thành công</div>
            </div>
            <div class="glass rounded-2xl p-4 text-center">
                <div class="text-3xl font-bold text-yellow-400" id="progressPercent">0%</div>
                <div class="text-sm text-gray-400">Tiến độ</div>
            </div>
            <div class="glass rounded-2xl p-4 text-center">
                <div class="text-3xl font-bold text-purple-400" id="countryCount">0</div>
                <div class="text-sm text-gray-400">Quốc gia</div>
            </div>
        </div>

        <!-- Log -->
        <div class="glass rounded-2xl p-6">
            <h3 class="font-semibold mb-3">📋 Log thời gian thực</h3>
            <div id="log" class="bg-black/40 rounded-xl p-4 h-48 overflow-y-auto font-mono text-sm"></div>
        </div>
    </div>

    <script>
        const log = document.getElementById('log');
        function addLog(msg, color = 'text-green-400') {
            const time = new Date().toLocaleTimeString();
            log.innerHTML += \`<div class="\${color}">[\${time}] \${msg}</div>\`;
            log.scrollTop = log.scrollHeight;
        }
        addLog('🚀 Bot sẵn sàng!', 'text-blue-400');

        async function startBot() {
            const btn = document.getElementById('btnStart');
            btn.textContent = '⏳ ĐANG CHẠY...';
            btn.disabled = true;
            
            const target = document.getElementById('target').value;
            const countries = document.getElementById('countries').value;
            const concurrent = document.getElementById('concurrent').value;
            
            addLog(\`🚀 Bắt đầu: target=\${target}, countries=\${countries}\`, 'text-yellow-400');
            
            try {
                const res = await fetch(\`/api/massive?target=\${target}&countries=\${countries}&concurrent=\${concurrent}\`);
                const data = await res.json();
                
                if (data.success) {
                    addLog(\`✅ \${data.message}\`, 'text-green-400');
                    document.getElementById('totalVisits').textContent = (data.achieved || data.totalVisits || 0).toLocaleString();
                    document.getElementById('progressPercent').textContent = (data.progress || '0%');
                    document.getElementById('countryCount').textContent = data.countries?.length || 0;
                } else {
                    addLog(\`❌ Lỗi: \${data.error}\`, 'text-red-400');
                }
            } catch(e) {
                addLog(\`❌ Lỗi kết nối: \${e.message}\`, 'text-red-400');
            }
            
            btn.textContent = '🚀 CHẠY';
            btn.disabled = false;
        }
    </script>
</body>
</html>
  `);
};
