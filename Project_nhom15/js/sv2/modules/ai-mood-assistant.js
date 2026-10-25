/* AI-3: Mood Keyword Assistant
 * Hỗ trợ Nhà thiết kế gợi ý từ khóa phong cách thị giác và bảng màu HEX
 * Quy trình: Input -> Validation -> Processing (Skeleton/Progress) -> Result -> Explanation -> User Control (Accept/Edit/Reject/Regenerate/Manual)
 * Trạng thái thất bại: Thiếu dữ liệu, không chắc chắn, thử lại, nhập thủ công
 */
window.AIMoodAssistant = (() => {
  // Bộ tri thức phong cách thẩm mỹ
  const KNOWLEDGE_BASE = [
    {
      match: ['cà phê', 'moc', 'mộc', 'kraft', 'organic', 'tự nhiên', 'nông sản', 'rừng'],
      themeName: 'Mộc Mạc Hữu Cơ (Earthy Organic)',
      keywords: ['Nguyên bản & Thô mộc', 'Chất liệu Kraft tự nhiên', 'Thủ công tinh tế', 'Tối giản Bắc Âu', 'Ấm áp & Tin cậy'],
      palette: [
        { hex: '#24473b', name: 'Xanh Rừng Già (Deep Forest)', role: 'Màu chủ đạo' },
        { hex: '#cbbb97', name: 'Giấy Kraft Tự Nhiên (Raw Kraft)', role: 'Màu nền / Bao bì' },
        { hex: '#f6f1e5', name: 'Trắng Kem Mộc (Cream Linen)', role: 'Màu tương phản phụ' },
        { hex: '#5a4434', name: 'Nâu Espresso Đậm (Roasted Bean)', role: 'Màu chữ & Chi tiết' }
      ],
      materials: 'Giấy kraft tái chế sần nhẹ, in lụa 2 màu đơn sắc, ép nhũ mờ hạt cát.',
      typography: 'Serif cổ điển có chân vững chãi kết hợp Sans-serif thoáng đãng.',
      explanation: 'Sắc xanh rừng sẫm #24473B gợi nhớ cao nguyên và nguồn gốc đồi chè, kết hợp hoàn hảo cùng tông kraft #CBBB97 tạo xúc giác thô ráp, thân thiện môi trường, truyền tải thông điệp "từ những điều nguyên bản".'
    },
    {
      match: ['trà', 'lúa', 'thanh', 'truyền thống', 'dân gian', 'búp trà', 'đồng quê'],
      themeName: 'Thanh Tao Truyền Thống (Heritage Minimal)',
      keywords: ['Thanh khiết', 'Vụ mùa bội thu', 'Trà thủ công', 'Nét vẽ thủy mặc', 'Trầm tĩnh'],
      palette: [
        { hex: '#d4af37', name: 'Vàng Lúa Chín (Golden Harvest)', role: 'Màu chủ đạo' },
        { hex: '#4a7c59', name: 'Xanh Búp Trà Non (Tea Leaf)', role: 'Màu điểm nhấn' },
        { hex: '#fbf9f1', name: 'Trắng Sương Mai (Morning Mist)', role: 'Màu nền' },
        { hex: '#3d312a', name: 'Nâu Đất Nung (Terracotta Dark)', role: 'Màu chữ' }
      ],
      materials: 'Hộp thiếc phủ mờ hoặc giấy dó dập nổi họa tiết gân lá.',
      typography: 'Font thư pháp hiện đại nét thanh nét đậm.',
      explanation: 'Sự kết hợp giữa sắc vàng ấm của cánh đồng lúa và xanh dịu của búp trà non phản ánh văn hóa nông sản Việt Nam thuần khiết, mang lại cảm giác bình yên và trân quý.'
    },
    {
      match: ['sang trọng', 'cao cấp', 'luxury', 'tối giản', 'tinh tế', 'premium', 'đen'],
      themeName: 'Sang Trọng Tối Giản (Modern Luxury)',
      keywords: ['Đẳng cấp tối giản', 'Đơn sắc tinh tuyển', 'Khoảng trắng đắt giá', 'Sắc sảo', 'Bền vững'],
      palette: [
        { hex: '#18181b', name: 'Đen Obsidian (Obsidian Black)', role: 'Màu chủ đạo' },
        { hex: '#d4af37', name: 'Vàng Champagne (Champagne Gold)', role: 'Màu ánh kim nhấn' },
        { hex: '#f4f4f5', name: 'Bạch Kim Sáng (Platinum)', role: 'Màu nền' },
        { hex: '#71717a', name: 'Xám Titan (Titanium Grey)', role: 'Màu phụ' }
      ],
      materials: 'Bao bì ép kim chìm, phủ UV định hình bề mặt mịn như nhung.',
      typography: 'High-contrast Serif hoặc Geometric Sans hình học cao cấp.',
      explanation: 'Độ tương phản cao giữa màu đen sâu và chi tiết kim loại Champagne Gold tôn vinh đẳng cấp vượt thời gian, tập trung tối đa vào nhận diện thương hiệu.'
    },
    {
      match: ['trẻ trung', 'sôi nổi', 'vibrant', 'công nghệ', 'sáng tạo', 'năng động', 'hiện đại'],
      themeName: 'Sáng Tạo Trẻ Trung (Creative Vanguard)',
      keywords: ['Tràn đầy năng lượng', 'Bứt phá quy chuẩn', 'Kỹ thuật số', 'Táo bạo & Độc bản', 'Màu sắc dẫn dắt'],
      palette: [
        { hex: '#635bff', name: 'Tím Indigo Điện Tử (Electric Violet)', role: 'Màu chủ đạo' },
        { hex: '#06b6d4', name: 'Xanh Cyan Tươi (Bright Cyan)', role: 'Màu tương phản' },
        { hex: '#1e293b', name: 'Xanh Đêm Kỹ Thuật Số (Cyber Slate)', role: 'Màu nền đậm' },
        { hex: '#f8fafc', name: 'Trắng Tinh Khiết (Pure White)', role: 'Màu chữ' }
      ],
      materials: 'Bao bì holographic đổi màu, phủ màng bóng tương phản cao.',
      typography: 'Display font đậm nét, layout phá cách modular.',
      explanation: 'Tông màu tím Indigo kết hợp Cyan tạo cảm giác đương đại, đại diện cho tinh thần số hóa và sự đột phá sáng tạo của thế hệ mới.'
    }
  ];

  // Hàm mô phỏng AI phân tích và gợi ý
  function generateSuggestion(promptText, simulateFailure = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateFailure) {
          reject(new Error('AI không đủ dữ liệu tin cậy: Mô tả quá ngắn hoặc chưa rõ định hướng thẩm mỹ. Vui lòng bổ sung thêm thông tin hoặc sử dụng chế độ nhập thủ công.'));
          return;
        }

        const clean = (promptText || '').toLowerCase().trim();
        if (clean.length < 5) {
          reject(new Error('Mô tả ý tưởng quá ngắn (cần ít nhất 5 ký tự) để AI có thể phân tích định hướng thị giác.'));
          return;
        }

        // Tìm chủ đề tương đồng
        let match = KNOWLEDGE_BASE.find(item => item.match.some(m => clean.includes(m)));
        if (!match) {
          reject(new Error('Chưa xác định được phong cách từ mô tả. Hãy thêm từ khóa như cà phê, trà, cao cấp hoặc công nghệ; bạn cũng có thể nhập thủ công.'));
          return;
        }

        resolve({
          themeName: match.themeName,
          keywords: [...match.keywords],
          palette: JSON.parse(JSON.stringify(match.palette)),
          materials: match.materials,
          typography: match.typography,
          explanation: match.explanation,
          rawPrompt: promptText,
          confidence: 'Mô phỏng theo từ khóa; không phải độ tin cậy đo từ mô hình AI.',
          timestamp: new Date().toISOString()
        });
      }, 1400); // Mô phỏng độ trễ suy nghĩ của AI
    });
  }

  return {
    generateSuggestion,
    KNOWLEDGE_BASE
  };
})();
