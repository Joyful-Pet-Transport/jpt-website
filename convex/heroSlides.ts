// import { query, mutation } from "./_generated/server";
// import { v } from "convex/values";

// export const getAll = query({
//   args: {},
//   handler: async (ctx) => {
//     const slides = await ctx.db
//       .query("heroSlides")
//       .order("asc")
//       .collect();

//     return await Promise.all(
//       slides.map(async (slide) => ({
//         ...slide,
//         imageUrl: await ctx.storage.getUrl(slide.imageUrl),
//       }))
//     );
//   },
// });

// export const create = mutation({
//   args: {
//     imageUrl: v.string(),
//     petName: v.string(),
//     route: v.string(),
//     order: v.number(),
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db.insert("heroSlides", args);
//   },
// });