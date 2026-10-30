# Booking/POS — UX & product recommendations

## North-star experience

The product should optimize for one operational question: **“At this moment, who is waiting, who is being served, and what capacity is still available?”** Catalog and configuration remain important, but the default landing page should be the live operation view rather than the service catalog.

## Recommended product priorities

### P0 — Reliable booking operations

- Availability engine: validate business hours, staff shifts, staff skill, leave, room/bed/equipment capacity, service setup/cleanup buffer, and overlapping bookings in one transaction.
- Appointment state model: `draft → pending deposit → confirmed → arrived → in service → completed`, with separate `cancelled` and `no-show` outcomes.
- Hold a slot for 3–5 minutes while the receptionist confirms or collects a deposit; show expiration explicitly.
- Quick customer lookup by phone number, with create-new-customer inline when no match exists.
- Day view grouped by staff/resource; order list remains a separate transaction-oriented view.
- Audit log for every schedule, assignee, status, price, and payment change.

### P1 — Queue and walk-in experience

- Use one queue with two lanes: booked customers and walk-ins. A booked customer arriving within a configurable grace window keeps priority.
- Show `estimated start`, not only queue position. Recalculate when a service runs late or a staff member becomes unavailable.
- Let the receptionist insert a walk-in only when the engine can show downstream impact; require confirmation when another appointment may be delayed.
- Add statuses `arrived`, `waiting`, `called`, `in service`, `skipped`, and `left` for clinics/hospitals. These queue states should not replace booking states.
- Optional QR/self check-in can identify the appointment, but a staff member should confirm identity and special notes before service begins.

### P1 — Fair auto-assignment

- Support three explicit strategies: customer preference, earliest available qualified staff, and fair rotation.
- Fair rotation should use eligible working minutes or service points, not only appointment count, because a 90-minute service is not equivalent to a 30-minute service.
- Preserve manual override with a required reason; expose the projected workload before confirming.
- Add service continuity as a soft preference: repeat customers can be routed to their previous staff member when available.

### P1 — Checkout and entitlements

- Keep Booking, Order, Payment, Package Entitlement, and Commission as separate records linked by IDs.
- A combined order can contain products, services, package sales, package redemptions, and account-card payment.
- Package redemption should use an immutable ledger (`reserve`, `consume`, `release`, `refund`) so cancellations and corrections are traceable.
- Commission should only become payable after the configured event (`completed` or `paid`), and should reverse automatically on refund.
- Surface relevant upsell suggestions after service completion, based on the completed service and customer history; keep them dismissible.

### P2 — Retention and automation

- Recurring bookings need series-level and occurrence-level edits, with conflict resolution per occurrence.
- Automated reminders should include confirm/reschedule actions; track delivery and response status.
- Add waitlist auto-fill when a slot is cancelled, respecting preferred branch, service, staff, and time window.
- Loyalty and promotion eligibility should be previewed before payment and explained when a coupon cannot be applied.

## UX principles for the demo

- Use one primary action per decision area.
- Show availability and resource consequences beside the selected time, not as an error after submit.
- Use status badges only for status; use buttons for actions.
- Prefer a side panel or a stepped modal for the long booking flow on desktop. Keep a sticky footer with `Hủy` and the primary confirmation action.
- Make operational exceptions visually prominent: late arrival, overrun risk, unpaid deposit, resource conflict, staff absence, and no-show history.
- Do not communicate capacity only with color; always include text and counts.

## Suggested success metrics

- Median time to create an appointment.
- Double-booking and resource-conflict rate.
- Check-in-to-service waiting time (p50/p90).
- No-show and late-cancellation rate.
- Staff utilization and workload variance.
- Deposit conversion and refund rate.
- Package redemption error/reversal rate.
- Upsell acceptance without increasing checkout time.

