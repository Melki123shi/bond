"use client";

import { useBondStore } from "@/store/bondStore";
import { BondFilters } from "@/types/bond";
import { RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

export default function BondSearchForm() {
  const { filters, setFilters, resetFilters } = useBondStore();
  const [errors, setErrors] = useState<Partial<BondFilters>>({});

  const validateInput = (name: string, value: string): string | null => {
    if (name === "minCoupon" || name === "maxCoupon") {
      if (value && (isNaN(parseFloat(value)) || parseFloat(value) < 0)) {
        return "Must be a valid positive number";
      }
      if (name === "minCoupon" && filters.maxCoupon) {
        const min = parseFloat(value);
        const max = parseFloat(filters.maxCoupon);
        if (!isNaN(min) && !isNaN(max) && min > max) {
          return "Min coupon cannot be greater than max coupon";
        }
      }
      if (name === "maxCoupon" && filters.minCoupon) {
        const min = parseFloat(filters.minCoupon);
        const max = parseFloat(value);
        if (!isNaN(min) && !isNaN(max) && max < min) {
          return "Max coupon cannot be less than min coupon";
        }
      }
    }

    if (name === "maturityBefore" || name === "maturityAfter") {
      if (value && isNaN(Date.parse(value))) {
        return "Must be a valid date";
      }
      if (name === "maturityBefore" && filters.maturityAfter) {
        const before = new Date(value);
        const after = new Date(filters.maturityAfter);
        if (
          !isNaN(before.getTime()) &&
          !isNaN(after.getTime()) &&
          before < after
        ) {
          return "Before date cannot be earlier than after date";
        }
      }
      if (name === "maturityAfter" && filters.maturityBefore) {
        const before = new Date(filters.maturityBefore);
        const after = new Date(value);
        if (
          !isNaN(before.getTime()) &&
          !isNaN(after.getTime()) &&
          after > before
        ) {
          return "After date cannot be later than before date";
        }
      }
    }

    return null;
  };

  const handleInputChange = (name: keyof BondFilters, value: string) => {
    const error = validateInput(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    if (!error) {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const handleReset = () => {
    resetFilters();
    setErrors({});
  };

  const hasFilters = Object.values(filters).some((value) => value !== "");

  return (
    <Card className="w-full bg-transparent text-white border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Bond Search Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Coupon Rate Range */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-neutral-200">
            Coupon Rate Range (%)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minCoupon">Minimum Coupon</Label>
              <Input
                id="minCoupon"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 2.5"
                value={filters.minCoupon}
                onChange={(e) => handleInputChange("minCoupon", e.target.value)}
                className={errors.minCoupon ? "border-red-500" : ""}
              />
              {errors.minCoupon && (
                <p className="text-xs text-red-500">{errors.minCoupon}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxCoupon">Maximum Coupon</Label>
              <Input
                id="maxCoupon"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 6.0"
                value={filters.maxCoupon}
                onChange={(e) => handleInputChange("maxCoupon", e.target.value)}
                className={`${
                  errors.maxCoupon ? "border-red-500" : ""
                } placeholder-amber-200`}
              />
              {errors.maxCoupon && (
                <p className="text-xs text-red-500">{errors.maxCoupon}</p>
              )}
            </div>
          </div>
        </div>

        {/* Maturity Date Range */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-neutral-200">
            Maturity Date Range
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maturityAfter">After Date</Label>
              <Input
                id="maturityAfter"
                type="date"
                value={filters.maturityAfter}
                onChange={(e) =>
                  handleInputChange("maturityAfter", e.target.value)
                }
                className={errors.maturityAfter ? "border-red-500" : ""}
              />
              {errors.maturityAfter && (
                <p className="text-xs text-red-500">{errors.maturityAfter}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-neutral-200" htmlFor="maturityBefore">
                Before Date
              </Label>
              <Input
                id="maturityBefore"
                type="date"
                value={filters.maturityBefore}
                onChange={(e) =>
                  handleInputChange("maturityBefore", e.target.value)
                }
                className={errors.maturityBefore ? "border-red-500" : ""}
              />
              {errors.maturityBefore && (
                <p className="text-xs text-red-500">{errors.maturityBefore}</p>
              )}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        {hasFilters && (
          <div className="flex justify-start">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2 bg-purple-700 border-transparent hover:bg-transparent hover:text-white hover:border-blue-950 text-white hover:cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
