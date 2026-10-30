const BookingService = (() => {
  const transitions = Object.freeze({
    confirmed: ['checkedin', 'cancelled'], checkedin: ['completed', 'cancelled'], completed: [], cancelled: []
  });

  function validate(input, context) {
    const { services, staff, bookings, businessHours, editingId } = context;
    const service = services.find(item => item.id === input.service);
    const employee = staff.find(item => item.id === input.staff);
    if (!input.customer || !service || !employee || !input.date || !input.time) return { ok: false, message: 'Vui lòng nhập đầy đủ thông tin bắt buộc.' };
    if (!service.active || !employee.active) return { ok: false, message: 'Dịch vụ hoặc KTV hiện không hoạt động.' };
    if (!service.staff.includes(employee.id)) return { ok: false, message: 'KTV không thực hiện dịch vụ này.' };
    const toMinutes = value => { const [h, m] = value.split(':').map(Number); return h * 60 + m; };
    const start = toMinutes(input.time), end = start + service.duration;
    if (start < toMinutes(businessHours.start) || end > toMinutes(businessHours.end)) return { ok: false, message: `Lịch phải nằm trong ca ${businessHours.start}–${businessHours.end}.` };
    const conflict = bookings.find(item => {
      if (item.id === editingId || item.status === 'cancelled' || item.date !== input.date || item.staff !== input.staff) return false;
      const currentService = services.find(serviceItem => serviceItem.id === item.service);
      const currentStart = toMinutes(item.time);
      return start < currentStart + currentService.duration && end > currentStart;
    });
    return conflict ? { ok: false, message: `KTV đang trùng với ${conflict.id} lúc ${conflict.time}.` } : { ok: true };
  }

  const canTransition = (from, to) => Boolean(transitions[from]?.includes(to));
  return Object.freeze({ validate, canTransition });
})();
