import { Bond, BondFilters } from '@/types/bond';
import { create } from 'zustand';

const mockBonds: Bond[] = [
  {
    id: '1',
    name: 'US Treasury 10Y',
    issuer: 'US Government',
    coupon: 4.25,
    maturityDate: '2034-03-15',
    faceValue: 1000,
    marketPrice: 1020.50
  },
  {
    id: '2',
    name: 'Apple Corporate Bond',
    issuer: 'Apple Inc.',
    coupon: 3.80,
    maturityDate: '2031-08-20',
    faceValue: 1000,
    marketPrice: 995.75
  },
  {
    id: '3',
    name: 'Microsoft 5Y Note',
    issuer: 'Microsoft Corporation',
    coupon: 2.90,
    maturityDate: '2029-11-10',
    faceValue: 1000,
    marketPrice: 985.25
  },
  {
    id: '4',
    name: 'Germany Bund',
    issuer: 'Federal Republic of Germany',
    coupon: 1.50,
    maturityDate: '2032-07-04',
    faceValue: 1000,
    marketPrice: 890.00
  },
  {
    id: '5',
    name: 'JP Morgan Chase Bond',
    issuer: 'JPMorgan Chase & Co.',
    coupon: 5.25,
    maturityDate: '2028-12-15',
    faceValue: 1000,
    marketPrice: 1045.80
  },
  {
    id: '6',
    name: 'Tesla Corporate Bond',
    issuer: 'Tesla Inc.',
    coupon: 6.15,
    maturityDate: '2026-05-30',
    faceValue: 1000,
    marketPrice: 1065.90
  },
  {
    id: '7',
    name: 'UK Gilt 15Y',
    issuer: 'UK Government',
    coupon: 3.25,
    maturityDate: '2039-01-22',
    faceValue: 1000,
    marketPrice: 925.40
  },
  {
    id: '8',
    name: 'Amazon Corporate Bond',
    issuer: 'Amazon.com Inc.',
    coupon: 4.80,
    maturityDate: '2030-06-18',
    faceValue: 1000,
    marketPrice: 1015.25
  }
];

interface BondStore {
  bonds: Bond[];
  filteredBonds: Bond[];
  filters: BondFilters;
  setFilters: (filters: BondFilters) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const initialFilters: BondFilters = {
  minCoupon: '',
  maxCoupon: '',
  maturityBefore: '',
  maturityAfter: ''
};

export const useBondStore = create<BondStore>((set, get) => ({
  bonds: mockBonds,
  filteredBonds: mockBonds,
  filters: initialFilters,
  
  setFilters: (filters: BondFilters) => {
    set({ filters });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { bonds, filters } = get();
    
    let filtered = bonds.filter((bond) => {
      // Coupon rate filtering
      if (filters.minCoupon && bond.coupon < parseFloat(filters.minCoupon)) {
        return false;
      }
      if (filters.maxCoupon && bond.coupon > parseFloat(filters.maxCoupon)) {
        return false;
      }
      
      // Maturity date filtering
      const bondMaturity = new Date(bond.maturityDate);
      
      if (filters.maturityBefore) {
        const beforeDate = new Date(filters.maturityBefore);
        if (bondMaturity > beforeDate) {
          return false;
        }
      }
      
      if (filters.maturityAfter) {
        const afterDate = new Date(filters.maturityAfter);
        if (bondMaturity < afterDate) {
          return false;
        }
      }
      
      return true;
    });
    
    set({ filteredBonds: filtered });
  },
  
  resetFilters: () => {
    set({ 
      filters: initialFilters,
      filteredBonds: mockBonds
    });
  }
}));