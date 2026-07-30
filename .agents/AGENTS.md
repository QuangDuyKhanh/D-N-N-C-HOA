# AGENTS.md – Quy tắc dự án DOCI Perfume

## 🗣️ Quy tắc giao tiếp & Ngôn ngữ AI
- **Tiếng Việt**: Luôn luôn giao tiếp, giải thích và báo cáo hoàn toàn bằng tiếng Việt.
- **Sử dụng dấu `<-->`**: Sử dụng ký hiệu `<-->` làm dấu phân cách hoặc đầu dòng khi báo cáo, trao đổi và cập nhật công việc.

## 🚀 Auto-Deploy Vercel sau mỗi thay đổi code

**QUY TẮC BẮT BUỘC**: Sau mỗi lần sửa code hoặc hoàn thành một tính năng cho dự án này,
LUÔN LUÔN tự động deploy lên Vercel Production mà không cần người dùng nhắc.

### Lệnh deploy Vercel (chạy từ thư mục gốc dự án):
```
npx vercel --prod --yes
```

### Quy trình bắt buộc sau mỗi task hoàn thành:
1. Hoàn thành sửa / thêm code
2. Chạy lệnh deploy Vercel ở trên (Cwd: `c:\laragon\www\dự án nước hoa`)
3. Xác nhận Vercel Deploy complete và báo cáo Vercel Production URL cho người dùng
4. Nhắc người dùng: nhấn Ctrl+F5 trên máy tính hoặc mở điện thoại để xem bản mới

### Thông tin dự án Vercel:
- **Production URL**: https://doci-perfume.vercel.app
- **Thư mục gốc**: c:\laragon\www\dự án nước hoa


