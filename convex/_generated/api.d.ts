/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as cron from "../cron.js";
import type * as http from "../http.js";
import type * as mutations_google_reviews from "../mutations/google_reviews.js";
import type * as tables_booking_process from "../tables/booking_process.js";
import type * as tables_frequently_asked_questions from "../tables/frequently_asked_questions.js";
import type * as tables_google_reviews from "../tables/google_reviews.js";
import type * as tables_post_services from "../tables/post_services.js";
import type * as tables_services from "../tables/services.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  cron: typeof cron;
  http: typeof http;
  "mutations/google_reviews": typeof mutations_google_reviews;
  "tables/booking_process": typeof tables_booking_process;
  "tables/frequently_asked_questions": typeof tables_frequently_asked_questions;
  "tables/google_reviews": typeof tables_google_reviews;
  "tables/post_services": typeof tables_post_services;
  "tables/services": typeof tables_services;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
