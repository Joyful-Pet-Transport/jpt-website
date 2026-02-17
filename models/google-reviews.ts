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
