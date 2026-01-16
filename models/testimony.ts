import { Rating } from "./rating";
import { User } from "./user";

export interface Testimony {
  user: User;
  rating: Rating;
  date?: string;
  attachment?: string[];
}
