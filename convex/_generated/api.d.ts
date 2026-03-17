/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_contact_us from "../actions/contact_us.js";
import type * as auth from "../auth.js";
import type * as cron from "../cron.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as mutations_available_countries from "../mutations/available_countries.js";
import type * as mutations_bookings from "../mutations/bookings.js";
import type * as mutations_contact_us from "../mutations/contact_us.js";
import type * as mutations_domestic_pet_transport from "../mutations/domestic_pet_transport.js";
import type * as mutations_google_reviews from "../mutations/google_reviews.js";
import type * as mutations_international_pet_transport from "../mutations/international_pet_transport.js";
import type * as mutations_pet_details from "../mutations/pet_details.js";
import type * as mutations_rabies_serology_test from "../mutations/rabies_serology_test.js";
import type * as tables_available_countries from "../tables/available_countries.js";
import type * as tables_booking_process from "../tables/booking_process.js";
import type * as tables_bookings from "../tables/bookings.js";
import type * as tables_contact_us from "../tables/contact_us.js";
import type * as tables_domestic_pet_transport from "../tables/domestic_pet_transport.js";
import type * as tables_frequently_asked_questions from "../tables/frequently_asked_questions.js";
import type * as tables_google_reviews from "../tables/google_reviews.js";
import type * as tables_international_pet_transport from "../tables/international_pet_transport.js";
import type * as tables_pet_details from "../tables/pet_details.js";
import type * as tables_post_services from "../tables/post_services.js";
import type * as tables_rabies_serology_test from "../tables/rabies_serology_test.js";
import type * as tables_roles from "../tables/roles.js";
import type * as tables_services from "../tables/services.js";
import type * as tables_users from "../tables/users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/contact_us": typeof actions_contact_us;
  auth: typeof auth;
  cron: typeof cron;
  files: typeof files;
  http: typeof http;
  "mutations/available_countries": typeof mutations_available_countries;
  "mutations/bookings": typeof mutations_bookings;
  "mutations/contact_us": typeof mutations_contact_us;
  "mutations/domestic_pet_transport": typeof mutations_domestic_pet_transport;
  "mutations/google_reviews": typeof mutations_google_reviews;
  "mutations/international_pet_transport": typeof mutations_international_pet_transport;
  "mutations/pet_details": typeof mutations_pet_details;
  "mutations/rabies_serology_test": typeof mutations_rabies_serology_test;
  "tables/available_countries": typeof tables_available_countries;
  "tables/booking_process": typeof tables_booking_process;
  "tables/bookings": typeof tables_bookings;
  "tables/contact_us": typeof tables_contact_us;
  "tables/domestic_pet_transport": typeof tables_domestic_pet_transport;
  "tables/frequently_asked_questions": typeof tables_frequently_asked_questions;
  "tables/google_reviews": typeof tables_google_reviews;
  "tables/international_pet_transport": typeof tables_international_pet_transport;
  "tables/pet_details": typeof tables_pet_details;
  "tables/post_services": typeof tables_post_services;
  "tables/rabies_serology_test": typeof tables_rabies_serology_test;
  "tables/roles": typeof tables_roles;
  "tables/services": typeof tables_services;
  "tables/users": typeof tables_users;
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
