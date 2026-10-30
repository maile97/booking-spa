const SPA_SEED_CATALOG = Object.freeze({
  branches: [{ id: 'BR01', name: 'Spa Quận 1 · Demo', timezone: 'Asia/Ho_Chi_Minh' }],
  services: [
    { id: 'SVC-001', name: 'Chăm sóc da chuyên sâu', duration: 60, price: 650000, staff: ['NV01', 'NV02'], active: true },
    { id: 'SVC-002', name: 'Massage body thư giãn', duration: 90, price: 850000, staff: ['NV01', 'NV03'], active: true },
    { id: 'SVC-003', name: 'Gội đầu dưỡng sinh', duration: 45, price: 350000, staff: ['NV02', 'NV03'], active: true },
    { id: 'SVC-004', name: 'Liệu trình phục hồi da', duration: 75, price: 950000, staff: ['NV01', 'NV02'], active: true }
  ],
  staff: [
    { id: 'NV01', branchId: 'BR01', name: 'Ngọc Anh', active: true },
    { id: 'NV02', branchId: 'BR01', name: 'Minh Thư', active: true },
    { id: 'NV03', branchId: 'BR01', name: 'Thảo Vy', active: true }
  ],
  customers: [
    { id: 'KH001', name: 'Nguyễn Minh Hà', phone: '0901234567' },
    { id: 'KH002', name: 'Trần Bảo Ngọc', phone: '0912345678' },
    { id: 'KH003', name: 'Lê Hoàng Yến', phone: '0987654321' },
    { id: 'KH004', name: 'Phạm Gia Linh', phone: '0934567890' }
  ],
  packages: [
    { id: 'PKG-001', name: 'Combo chăm sóc da 5 buổi', price: 2800000, sessions: 5, service: 'SVC-001' },
    { id: 'PKG-002', name: 'Massage thư giãn 10 buổi', price: 7500000, sessions: 10, service: 'SVC-002' },
    { id: 'PKG-003', name: 'Gội dưỡng sinh 6 buổi', price: 1800000, sessions: 6, service: 'SVC-003' }
  ]
});
