// api/fetch.js
// ... (phần import và cấu hình giữ nguyên)

export default async function handler(req, res) {
  // ... (CORS, lấy URL từ query)

  // Số lần truy cập ảo bạn muốn tạo
  const visits = parseInt(req.query.visits) || 10; // Mặc định 10 lần
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0'
  ];

  try {
    const results = [];
    for (let i = 0; i < visits; i++) {
      // Chọn ngẫu nhiên một User-Agent
      const ua = userAgents[Math.floor(Math.random() * userAgents.length)];
      const response = await fetch(url, {
        headers: {
          'User-Agent': ua,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
      });
      results.push({
        visitNumber: i + 1,
        status: response.status,
        userAgent: ua,
        success: response.ok,
      });
      // Thêm độ trễ nhỏ để tránh bị chặn (ví dụ 500ms)
      if (i < visits - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    const successCount = results.filter(r => r.success).length;
    res.status(200).json({
      success: true,
      message: `✅ Đã gửi ${visits} lượt truy cập ảo (thành công: ${successCount})`,
      url: url,
      totalVisits: visits,
      successCount: successCount,
      details: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // ... (xử lý lỗi)
  }
}
