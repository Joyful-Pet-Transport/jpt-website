export const BookingStatus = {
  // Initial
  pending: "pending",

  // Approval
  approved: "approved",
  rejected: "rejected",

  // Preparation
  preparing: "preparing",
  documents: "documents",
  health_check: "health_check",

  // Transport
  scheduled: "scheduled",
  in_transit: "in_transit",
  delivered: "delivered",

  // Completion
  completed: "completed",

  // Exceptions
  delayed: "delayed",
  cancelled: "cancelled",
  issue: "issue", // covers requires_attention, customs, quarantine, etc.
};
