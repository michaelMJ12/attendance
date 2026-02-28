import type { DisputeReviewAction } from "../enums/DisputeReviewAction";

export interface AdminDisputeReviewDto {
  action: DisputeReviewAction;
  comment?: string;
}