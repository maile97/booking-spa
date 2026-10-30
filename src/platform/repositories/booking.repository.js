const BookingRepository = Object.freeze({
  all(database) {
    return database.bookings;
  },
  save(database, booking) {
    const index = database.bookings.findIndex(item => item.id === booking.id);
    if (index === -1) database.bookings.push(booking);
    else database.bookings[index] = booking;
    SpaDatabase.save(database);
    return booking;
  },
  updateStatus(database, id, status) {
    const booking = database.bookings.find(item => item.id === id);
    if (!booking) return null;
    booking.status = status;
    SpaDatabase.save(database);
    return booking;
  }
});
