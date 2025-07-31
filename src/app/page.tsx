"use client";

import BondResultsTable from '@/components/BondResultsTable';
import BondSearchForm from '@/components/BondSerachForm';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {/* Main Content */}
        <div className="space-y-8">
          <BondSearchForm />
          <BondResultsTable />
        </div>

      </div>
    </main>
  );
}