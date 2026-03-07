import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getRoleById } from "./roles";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      return null;
    }

    let role = null;
    if (user.roleId) {
      role = await getRoleById(ctx, user.roleId);
    }

    return {
      ...user,
      role,
    };
  },
});
