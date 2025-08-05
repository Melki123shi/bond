"use client";

import BondResultsTable from "@/components/BondResultsTable";
import BondSearchForm from "@/components/BondSerachForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex  items-center bg-gradient-to-b from-purple-800 to-blue-900 p-6 shadow-lg">
        <Header />
        <div className="mx-auto max-w-4xl px-4 py-8">
          <BondSearchForm />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <BondResultsTable />
      </div>
      <Footer />
    </main>
  );
}
