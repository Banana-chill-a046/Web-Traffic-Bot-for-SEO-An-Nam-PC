export default function handler(req, res) {
  // Trả về JSON luôn
  res.status(200).json({
    success: true,
    message: "Bot đang chạy!",
    websites: [
      "https://www.annampc.io.vn",
      "https://nammc.nammc.click",
      "https://testpc.nammc.click",
      "https://hoanghaopc.com"
    ],
    time: new Date().toISOString()
  });
}
