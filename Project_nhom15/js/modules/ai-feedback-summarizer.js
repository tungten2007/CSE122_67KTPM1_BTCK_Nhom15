/* AI-2 mô phỏng bằng quy tắc. Không gọi API hoặc gửi dữ liệu ra ngoài. */
window.FeedbackAI={
 generate(comments,people,fail=false){return new Promise((resolve,reject)=>{setTimeout(()=>{
  if(fail){reject(new Error('Không thể tổng hợp lúc này (lỗi mô phỏng). Bạn có thể thử lại hoặc nhập đề xuất thủ công.'));return}
  if(!comments.length){reject(new Error('Chọn ít nhất một phản hồi.'));return}
  const due=new Date(Date.now()+604800000).toISOString().slice(0,10);
  resolve(comments.map((c,i)=>{const s=c.text.toLocaleLowerCase('vi');let title,reason,ambiguous=false,priority='medium';
   if(/(chữ|tên sản phẩm).*(nhỏ|đọc)|cỡ chữ/.test(s)){title='Tăng độ rõ của tên sản phẩm';reason='Phản hồi nêu vấn đề về khả năng đọc. Cần kiểm tra lại kích thước chữ trên bản in.';priority='high'}
   else if(/hướng dẫn pha/.test(s)){title='Bổ sung hướng dẫn pha ở mặt sau';reason='Khách hàng yêu cầu thêm nội dung cụ thể còn thiếu trên bao bì.'}
   else if(/cao cấp|đẹp hơn|ấn tượng|chưa ổn|sang hơn|không thích/.test(s)){title='Làm rõ mong muốn của khách hàng';reason='Nhận xét cảm tính chưa có tiêu chí đo được. Hỏi rõ màu, chất liệu hoặc ví dụ mong muốn trước khi giao việc.';ambiguous=true}
   else{title='Xử lý phản hồi: '+c.text.slice(0,85);reason='Chưa có quy tắc phù hợp. Đây là bản nháp từ nguyên văn phản hồi; cần sửa thành yêu cầu cụ thể.';ambiguous=true}
   return {title,description:c.text,reason,sourceIds:[c.id],assignee:people[i%Math.max(people.length,1)]?.id||'',priority,due,ambiguous};
  }));
 },1100)})}
};
