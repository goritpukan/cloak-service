export const CheckResultEnum = ['bot', 'not bot'] as const;
export type CheckResult = (typeof CheckResultEnum)[number];
