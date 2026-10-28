# Spa Booking — Product Research & Interactive Demo

Prototype nghiên cứu và mô phỏng nghiệp vụ Spa Booking theo phong cách Haravan Admin.

## Chạy trên máy (macOS / VS Code)

1. `git clone https://github.com/maile97/booking-spa.git`
2. `cd booking-spa`
3. Mở thư mục trong VS Code (`code .` hoặc **File → Open Folder**).
4. Cài extension **Live Server** (Ritwick Dey), click phải `index.html` hoặc `demo.html` → **Open with Live Server**.

Không cần `npm install` hay build. Dùng Live Server thay vì mở trực tiếp `file://` để kiểm tra đúng cách phục vụ static assets.

## Cấu trúc

```text
booking-spa/
├── index.html                      # Research Hub, điểm vào GitHub Pages
├── demo.html                       # Spa Booking Admin demo
├── assets/
│   └── css/
│       ├── research.css            # Style Research Hub
│       ├── demo-base.css           # Style nền của demo
│       └── demo-haravan.css        # Override theo Haravan Admin
├── src/
│   ├── research/
│   │   ├── app.js                  # Điều hướng, lọc, modal benchmark
│   │   └── data/
│   │       ├── benchmarks.js       # Dữ liệu feature benchmark
│   │       └── screenshots.js      # Screenshot benchmark (base64)
│   └── demo/
│       ├── main.js                 # Khởi tạo demo & sự kiện chung
│       ├── core/
│       │   ├── data.js             # Dữ liệu mẫu, localStorage, trạng thái
│       │   ├── utils.js            # Helper dùng chung
│       │   └── navigation.js       # Điều hướng trang
│       └── features/
│           ├── bookings.js         # Lịch hẹn: tạo/sửa/hủy, kiểm tra trùng
│           ├── calendar.js         # Lịch KTV
│           ├── dashboard.js        # Tổng quan, KPI, danh sách
│           └── reports.js          # Báo cáo Spa
└── .gitignore
```

## Hướng dẫn chỉnh sửa theo tính năng

- **Lịch hẹn**: `src/demo/features/bookings.js`; HTML trong `demo.html`.
- **Lịch KTV**: `src/demo/features/calendar.js`; HTML trong `demo.html`.
- **Dashboard / KPI**: `src/demo/features/dashboard.js`.
- **Báo cáo**: `src/demo/features/reports.js`.
- **Dịch vụ / SKU, gói liệu trình, nhân viên / hoa hồng**: hiện là các màn hình prototype tĩnh trong `demo.html`; khi phát triển logic, tạo file tương ứng dưới `src/demo/features/`.
- **Dữ liệu mẫu**: `src/demo/core/data.js`; giữ tương thích key `haravan-spa-demo-v1` trong localStorage.
- **Benchmark / research**: `src/research/data/benchmarks.js`, `src/research/app.js`.

**Lưu ý:** Đây là bước đầu tách nguồn code theo module chức năng, **chưa phải React/TypeScript**. Các file JS vẫn dùng classic `<script>` và biến/hàm toàn cục để giữ tương thích với inline event handlers hiện tại. Không tự ý thêm `type="module"` khi chưa chuyển toàn bộ event handlers/imports. HTML markup hiện vẫn nằm trong 2 entrypoint để không phá giao diện hiện có.

## Quy trình làm việc nhóm

```bash
git pull origin main
git checkout -b feature/booking-validation
# Chỉnh sửa và kiểm tra bằng Live Server
git add .
git commit -m "feat: improve booking validation"
git push -u origin feature/booking-validation
```

Tạo **Pull Request** về `main`, review trước khi merge. GitHub Pages triển khai từ `main`.

## Links

- Research: https://maile97.github.io/booking-spa/
- Demo: https://maile97.github.io/booking-spa/demo.html
- Repository: https://github.com/maile97/booking-spa

## Lưu ý kỹ thuật

- Báo cáo và hoa hồng demo dùng dữ liệu giả lập, không kết nối API Haravan/POS.
- Screenshot benchmark được giữ nguyên trong `src/research/data/screenshots.js`; có thể chuyển thành file ảnh trong `assets/images/` ở đợt tối ưu tiếp theo.
- Khi dự án có backend, phân quyền, nhiều developer và tính năng phức tạp, cân nhắc chuyển sang Vite + React + TypeScript, API layer, router và test tự động.
