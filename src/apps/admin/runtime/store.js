let database = SpaDatabase.load();
let services = CatalogRepository.all(database, 'services');
let staff = CatalogRepository.all(database, 'staff');
let customers = CatalogRepository.all(database, 'customers');
let packages = CatalogRepository.all(database, 'packages').map(item => ({ ...item, sku: item.id }));
let bookings = BookingRepository.all(database);
let editing = null;

const today = () => new Date().toLocaleDateString('en-CA');
const money = value => Number(value).toLocaleString('vi-VN') + ' ₫';
const labelStatus = { confirmed: 'Đã xác nhận', checkedin: 'Đang phục vụ', completed: 'Hoàn tất', cancelled: 'Đã hủy' };

function refreshStore() {
  services = CatalogRepository.all(database, 'services');
  staff = CatalogRepository.all(database, 'staff');
  customers = CatalogRepository.all(database, 'customers');
  packages = CatalogRepository.all(database, 'packages').map(item => ({ ...item, sku: item.id }));
  bookings = BookingRepository.all(database);
}

function persist() {
  database.bookings = bookings;
  SpaDatabase.save(database);
}

function resetDemo() {
  if (!confirm('Đặt lại toàn bộ database demo về dữ liệu mẫu?')) return;
  database = SpaDatabase.reset();
  refreshStore();
  render();
  notify('Đã đặt lại database demo');
}
