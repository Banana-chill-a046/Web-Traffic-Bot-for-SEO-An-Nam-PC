export default function handler(req, res) {
  res.status(200).json({
    success: true,
    message: "Bot đang chạy!",
    websites: [
      "https://www.annampc.io.vn",
      "https://nammc.nammc.click",
      "https://testpc.nammc.click",
      "https://www.hoanghaopc.com"
    ],
    time: new Date().toISOString()
  });
}
