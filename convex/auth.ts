import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google],
  callbacks: {
    async createOrUpdateUser(ctx, args) {
      // Find or create the default "customer" role
      let customerRole = await ctx.db
        .query("roles")
        .filter((q) => q.eq(q.field("slug"), "customer"))
        .first();

      if (!customerRole) {
        const roleId = await ctx.db.insert("roles", {
          name: "Customer",
          slug: "customer",
        });
        customerRole = await ctx.db.get(roleId);
      }

      // If user already exists, ensure they have a roleId set
      if (args.existingUserId) {
        const existingUser = await ctx.db.get(args.existingUserId);

        if (existingUser && !existingUser.roleId) {
          await ctx.db.patch(args.existingUserId, {
            roleId: customerRole!._id,
          });
        }

        return args.existingUserId;
      }

      return ctx.db.insert("users", {
        ...args.profile,
        roleId: customerRole!._id,
      });
    },
  },
});
