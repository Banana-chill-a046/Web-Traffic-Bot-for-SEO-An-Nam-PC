<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AnnamPC SEO Bot</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen text-white">
    
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        
        <!-- Header -->
        <div class="text-center mb-8">
            <div class="text-6xl mb-4">🚀</div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AnnamPC SEO Bot
            </h1>
            <p class="text-gray-400 mt-2">🌍 Tăng traffic quốc tế - Tối ưu SEO</p>
            
            <div class="flex justify-center gap-2 flex-wrap mt-4">
                <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                    ✅ Đang hoạt động
                </span>
                <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                    🌐 50+ quốc gia
                </span>
                <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                    ⚡ 90k visits/ngày
                </span>
            </div>
        </div>

        <!-- Nút điều khiển -->
        <div class="text-center mb-8">
            <button onclick="runBot()" id="btnRun" 
                    class="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-xl font-bold hover:scale-105 transition shadow-lg shadow-purple-500/30">
                🚀 CHẠY BOT NGAY
            </button>
        </div>

        <!-- Thống kê -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10">
                <div class="text-2xl font-bold text-blue-400" id="totalVisits">0</div>
                <div class="text-xs text-gray-400">Tổng visits</div>
            </div>
            <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10">
                <div class="text-2xl font-bold text-green-400" id="successVisits">0</div>
                <div class="text-xs text-gray-400">Thành công</div>
            </div>
            <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10">
                <div class="text-2xl font-bold text-yellow-400" id="progressPercent">0%</div>
                <div class="text-xs text-gray-400">Tiến độ</div>
            </div>
            <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10">
                <div class="text-2xl font-bold text-purple-400" id="countryCount">0</div>
                <div class="text-xs text-gray-400">Quốc gia</div>
            </div>
        </div>

        <!-- Log -->
        <div class="bg-black/50 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 class="font-semibold mb-3 text-gray-300">📋 Log</h3>
            <div id="logBox" class="bg-black/50 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm"></div>
        </div>

    </div>

    <script>
        const logBox = document.getElementById('logBox');

        function addLog(message, color = '#4ade80') {
            const time = new Date().toLocaleTimeString();
            const div = document.createElement('div');
            div.className = 'py-0.5';
            div.innerHTML = `<span style="color: #6b7280;">[${time}]</span> <span style="color: ${color};">${message}</span>`;
            logBox.appendChild(div);
            logBox.scrollTop = logBox.scrollHeight;
        }

        function updateStats(total, success, target, countries) {
            document.getElementById('totalVisits').textContent = total || 0;
            document.getElementById('successVisits').textContent = success || 0;
            const percent = target > 0 ? Math.min(Math.round((total / target) * 100), 100) : 0;
            document.getElementById('progressPercent').textContent = percent + '%';
            document.getElementById('countryCount').textContent = countries || 0;
        }

        async function runBot() {
            const btn = document.getElementById('btnRun');
            btn.innerHTML = '⏳ ĐANG CHẠY...';
            btn.disabled = true;
            btn.className = 'px-12 py-4 bg-gray-600 rounded-2xl text-xl font-bold';

            addLog('🚀 Bắt đầu chạy bot...', '#fbbf24');

            try {
                // Gọi API
                const response = await fetch('/api/bot');
                
                // Kiểm tra response
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                
                if (data.success) {
                    addLog('✅ ' + data.message, '#4ade80');
                    
                    // Hiển thị kết quả từng URL
                    if (data.results && data.results.length > 0) {
                        data.results.forEach((r, index) => {
                            if (r.success) {
                                addLog(`  ✅ [${index + 1}] ${r.url} - Status: ${r.status}`, '#4ade80');
                            } else {
                                addLog(`  ❌ [${index + 1}] ${r.url} - Lỗi: ${r.error}`, '#f87171');
                            }
                        });
                        
                        // Update stats
                        const total = data.results.length;
                        const success = data.results.filter(r => r.success).length;
                        updateStats(total, success, total, 1);
                    }
                    
                } else {
                    addLog('❌ Lỗi: ' + (data.error || 'Không xác định'), '#f87171');
                }

            } catch (error) {
                addLog('❌ Lỗi kết nối: ' + error.message, '#f87171');
            }

            // Reset button
            btn.innerHTML = '🚀 CHẠY BOT NGAY';
            btn.disabled = false;
            btn.className = 'px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-xl font-bold hover:scale-105 transition shadow-lg shadow-purple-500/30';
        }

        // Tự động chạy khi load trang
        addLog('✅ Bot đã sẵn sàng!', '#4ade80');
        addLog('💡 Nhấn nút "CHẠY BOT NGAY" để bắt đầu', '#60a5fa');
        addLog('🌍 Mục tiêu: Tăng traffic từ 50+ quốc gia', '#a78bfa');

        // Chạy tự động sau 2 giây
        setTimeout(runBot, 2000);
    </script>

</body>
</html>
