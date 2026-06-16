// export interface GoogleReview {
//   _id: string;
//   name?: string;
//   reviewId: string;
//   reviewImageUrls?: string[];
//   reviewerPhotoUrl?: string;
//   stars: number;
//   text?: string;
//   reviewUrl?: string;
//   publishedAtDate: string;
// }

// Full review — used when viewing a single review (with images)
export interface GoogleReview {
  _id: string;
  name?: string;
  reviewId: string;
  reviewImageUrls?: string[];
  reviewerPhotoUrl?: string;
  stars: number;
  text?: string;
  reviewUrl?: string;
  publishedAtDate: string;
}

// List review — used in the testimonials page (no images, lighter)
export interface GoogleReviewListItem {
  _id: string;
  name?: string;
  stars: number;
  text?: string;
  publishedAtDate: string;
  reviewerPhotoUrl?: string;
  hasImages: boolean;
}