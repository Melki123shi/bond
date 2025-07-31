export interface Bond {
  id: string;
  name: string;
  issuer: string;
  coupon: number;
  maturityDate: string;
  faceValue: number;
  marketPrice: number;
}

export interface BondFilters {
  minCoupon: string;
  maxCoupon: string;
  maturityBefore: string;
  maturityAfter: string;
}