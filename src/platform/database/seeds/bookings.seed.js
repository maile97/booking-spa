function createBookingSeed(date) {
  return [
    { id: 'BK-1001', branchId: 'BR01', customer: 'KH001', service: 'SVC-001', staff: 'NV01', date, time: '09:00', status: 'confirmed', note: '' },
    { id: 'BK-1002', branchId: 'BR01', customer: 'KH002', service: 'SVC-003', staff: 'NV02', date, time: '10:00', status: 'checkedin', note: 'Khách muốn tư vấn da đầu' },
    { id: 'BK-1003', branchId: 'BR01', customer: 'KH003', service: 'SVC-002', staff: 'NV03', date, time: '14:00', status: 'confirmed', note: '' },
    { id: 'BK-1004', branchId: 'BR01', customer: 'KH004', service: 'SVC-004', staff: 'NV01', date, time: '15:30', status: 'completed', note: '' }
  ];
}
