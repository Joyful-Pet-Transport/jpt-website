export const BookingStatus = {
  // Initial states
  pending: "pending",

  // Confirmation states
  confirmed: "confirmed",
  approved: "approved",
  rejected: "rejected",

  // Preparation states
  preparing: "preparing",
  documents_pending: "documents_pending",
  health_check_required: "health_check_required",

  // Transport states
  in_transit: "in_transit",
  pickup_scheduled: "pickup_scheduled",
  pickup_completed: "pickup_completed",
  delivery_scheduled: "delivery_scheduled",
  delivery_completed: "delivery_completed",

  // Completion states
  completed: "completed",
  delivered: "delivered",

  // Issue states
  delayed: "delayed",
  cancelled: "cancelled",
  rescheduled: "rescheduled",

  // Special states
  quarantine: "quarantine",
  customs_clearance: "customs_clearance",
  requires_attention: "requires_attention",
};
