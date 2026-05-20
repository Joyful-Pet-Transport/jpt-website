/**
 * Local development only. Set in .env.local:
 * NEXT_PUBLIC_DEV_BYPASS_DASHBOARD_AUTH=true
 */
export const isDashboardAuthBypassEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_DEV_BYPASS_DASHBOARD_AUTH === "true";
