"use client";

import { useBondStore } from "@/store/bondStore";
import { Bond } from "@/types/bond";
import { Building2, Calendar, DollarSign, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

export default function BondResultsTable() {
  const { filteredBonds } = useBondStore();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCouponBadgeVariant = (coupon: number) => {
    if (coupon >= 5) return "default";
    if (coupon >= 3) return "secondary";
    return "outline";
  };

  const getPriceIndicator = (marketPrice: number, faceValue: number) => {
    const ratio = marketPrice / faceValue;
    if (ratio > 1.02) return { text: "Premium", color: "text-green-600" };
    if (ratio < 0.98) return { text: "Discount", color: "text-red-600" };
    return { text: "Par", color: "text-blue-600" };
  };

  if (filteredBonds.length === 0) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
          <TrendingUp className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">No bonds found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria to find matching bonds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-between mb-7">
        <div className="flex items-center gap-2 text-4xl font-bold text-gray-800 mx-auto">
          <TrendingUp className="h-11 w-11  border border-blue-500 rounded-full p-2 m-2 bg-blue-950 text-white" />
          Search Results
        </div>
        <Badge variant="secondary" className="border border-gray-100 px-4 bg-white min-w-min max-h-min py-3 my-auto font-bold text-md">
          {filteredBonds.length} bond{filteredBonds.length !== 1 ? "s" : ""}{" "}
          found
        </Badge>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="w-[250px]">Bond Details</TableHead>
              <TableHead className="px-4 py-5">Coupon</TableHead>
              <TableHead>Maturity</TableHead>
              <TableHead>Face Value</TableHead>
              <TableHead>Market Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBonds.map((bond: Bond) => {
              const priceIndicator = getPriceIndicator(
                bond.marketPrice,
                bond.faceValue
              );

              return (
                <TableRow key={bond.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{bond.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        {bond.issuer}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCouponBadgeVariant(bond.coupon)}>
                      {bond.coupon.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">
                        {formatDate(bond.maturityDate)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">
                        {formatCurrency(bond.faceValue)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {formatCurrency(bond.marketPrice)}
                    </div>
                  </TableCell>
                  <TableCell
                      className={`${priceIndicator.color} border-current p-2 font-bold text-1xl`}
                  >
                      {priceIndicator.text}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
