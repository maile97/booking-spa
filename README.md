# Spa Booking Platform — Research & Interactive Demo

MVP Spa Booking với hai luồng chính: **Đặt lịch** và **Quản lý đơn hàng đã đặt**. Dự án chạy thuần HTML/CSS/JavaScript qua Live Server; source được tách lớp để có thể thay local database bằng API mà không viết lại UI.

## Database khuyến nghị

Nên dùng **Supabase Free** trong giai đoạn thử nghiệm: PostgreSQL chuẩn, Auth, API tự sinh, Realtime và Row Level Security. Khi triển khai thật, tạo các bảng `branches`, `customers`, `staff`, `services`, `bookings`; bật RLS theo `tenant_id`/`branch_id`; đặt constraint ở database để chống double-booking. Frontend không được dùng service-role key.

```text
UI → BookingService (validation/use case) → Repository → Supabase adapter → PostgreSQL
```

`localStorage` hiện chỉ là adapter demo. Trước khi public production cần bổ sung đăng nhập/phân quyền, audit log, kiểm thử tự động, monitoring, timezone chuẩn và transaction chống trùng lịch phía server.

## Chạy trên máy

1. Mở repository bằng VS Code.
2. Cài extension **Live Server**.
3. Click phải `index.html` hoặc `demo.html` → **Open with Live Server**.

Không cần `npm install`. Không nên mở trực tiếp bằng `file://`.

## Kiến trúc source

```text
booking-spa/
├── index.html                         # Research Hub
├── demo.html                          # Admin application
├── assets/css/                        # Presentation layer
└── src/
    ├── apps/
    │   ├── admin/
    │   │   ├── core/                  # Điều hướng application
    │   │   ├── features/              # Booking, calendar, dashboard, report
    │   │   ├── runtime/store.js       # Ghép database vào UI hiện tại
    │   │   └── main.js                # Bootstrap Admin app
    ├── research/                      # Research app và dữ liệu benchmark
    ├── platform/
    │   ├── config/                    # Cấu hình platform
    │   ├── database/
    │   │   ├── schema.js              # Schema và danh sách table
    │   │   └── seeds/                 # Dữ liệu khởi tạo
    │   ├── infrastructure/storage/    # Local database adapter
    │   └── repositories/              # Data access cho catalog/booking
    └── shared/                        # Helper dùng chung
```

Luồng phụ thuộc một chiều:

```text
UI features → runtime store → repositories → local database → schema/seeds
```

## Database giả lập

Database được lưu trong `localStorage` với key `spa-booking-platform-db`. Cấu trúc hiện tại:

- `meta`: phiên bản schema và thời điểm seed.
- `branches`: chi nhánh.
- `customers`: khách hàng.
- `staff`: nhân viên/KTV.
- `services`: dịch vụ, giá, thời lượng và KTV phù hợp.
- `packages`: gói liệu trình.
- `bookings`: lịch hẹn và trạng thái vận hành.

Nút **Đặt lại dữ liệu** tạo lại toàn bộ database. Adapter tự migrate booking từ key cũ `haravan-spa-demo-v1` ở lần chạy đầu, nên dữ liệu demo đã nhập trước đó không bị mất.

Khi có backend thật, giữ repository contract và thay `local-database.js` bằng HTTP/API adapter. UI feature không cần biết dữ liệu nằm ở localStorage hay server.

## Quy ước phát triển tiếp

- Mỗi nghiệp vụ mới đặt trong `src/apps/admin/features/<feature>.js`.
- Thay đổi schema phải tăng `schemaVersion` và bổ sung migration.
- Feature không đọc/ghi localStorage trực tiếp; truy cập qua repository/runtime store.
- Booking quản lý thời gian; Order quản lý giao dịch; Entitlement quản lý quyền lợi; Commission quản lý khoản phải trả. Không gộp trạng thái các domain này.
- Khi scope lớn hơn prototype, bước tiếp theo phù hợp là Vite + TypeScript, router, API server và test tự động.
