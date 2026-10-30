const SpaDatabase = (() => {
  const clone = value => JSON.parse(JSON.stringify(value));
  const databaseToday = () => new Date().toLocaleDateString('en-CA');

  function seed() {
    return {
      meta: { schemaVersion: DATABASE_SCHEMA.version, seededAt: new Date().toISOString() },
      branches: clone(SPA_SEED_CATALOG.branches),
      customers: clone(SPA_SEED_CATALOG.customers),
      staff: clone(SPA_SEED_CATALOG.staff),
      services: clone(SPA_SEED_CATALOG.services),
      packages: clone(SPA_SEED_CATALOG.packages),
      bookings: createBookingSeed(databaseToday())
    };
  }

  function isValid(database) {
    return database && database.meta?.schemaVersion === SPA_CONFIG.schemaVersion &&
      DATABASE_SCHEMA.tables.every(table => Array.isArray(database[table]));
  }

  function migrateLegacyBookings(database) {
    const legacy = localStorage.getItem(SPA_CONFIG.legacyBookingKey);
    if (!legacy) return database;
    try {
      const bookings = JSON.parse(legacy);
      if (Array.isArray(bookings)) database.bookings = bookings;
    } catch (error) {
      console.warn('Không thể migrate dữ liệu booking cũ.', error);
    }
    localStorage.removeItem(SPA_CONFIG.legacyBookingKey);
    return database;
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(SPA_CONFIG.databaseKey));
      if (isValid(saved)) return saved;
    } catch (error) {
      console.warn('Database local bị lỗi, hệ thống sẽ tạo lại dữ liệu mẫu.', error);
    }
    const database = migrateLegacyBookings(seed());
    save(database);
    return database;
  }

  function save(database) {
    localStorage.setItem(SPA_CONFIG.databaseKey, JSON.stringify(database));
  }

  function reset() {
    const database = seed();
    save(database);
    return database;
  }

  return Object.freeze({ load, save, reset });
})();
