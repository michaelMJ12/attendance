export const DisputeReviewAction = {
  APPROVE : "APPROVE",
  REJECT :"REJECT",
} as const


export type DisputeReviewAction =
  typeof DisputeReviewAction[keyof typeof DisputeReviewAction];