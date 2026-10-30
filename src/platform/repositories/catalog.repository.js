const CatalogRepository = Object.freeze({
  all(database, table) {
    if (!DATABASE_SCHEMA.tables.includes(table) || table === 'bookings') return [];
    return database[table];
  },
  find(database, table, id) {
    return this.all(database, table).find(item => item.id === id);
  }
});
