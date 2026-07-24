"use client";

import { useState } from "react";
import Link from "next/link";
import machinesData from "@/data/machines.json";
import { Footprints, Activity, Dumbbell } from "lucide-react";

const categoryIcons = {
  legs: Footprints,
  back: Activity,
};

const categoryGradients = {
  legs: "from-blue-600 to-cyan-500",
  back: "from-purple-600 to-pink-500",
};

export default function Home() {
  const { categories, machines } = machinesData;
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMachines = machines.filter((m) => {
    const matchesCategory =
      activeCategory === "all" || m.category === activeCategory;
    const matchesSearch = m.name.en
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="px-4 md:px-8 py-10 md:py-16 text-center border-b border-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          Al Fallah Palace Gym Guide
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Scan. Learn. Train right.
        </p>
      </div>

      <div className="p-4 md:p-8 w-full max-w-2xl md:max-w-[95%] mx-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search machines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md mx-auto block bg-gray-900 border border-gray-800 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-blue-600 text-white scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.name.en}
            </button>
          ))}
        </div>

        {/* Machine Cards Grid or Empty State */}
        {filteredMachines.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Dumbbell size={40} className="mx-auto mb-3 opacity-40" />
            <p>No machines added in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredMachines.map((machine, index) => {
              const Icon = categoryIcons[machine.category] || Dumbbell;
              const gradient =
                categoryGradients[machine.category] ||
                "from-gray-700 to-gray-600";
              return (
                <Link
                  key={machine.id}
                  href={`/machine/${machine.id}`}
                  className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-600 hover:bg-gray-800 transition-all duration-200 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div
                    className={`h-24 bg-linear-to-br ${gradient} flex items-center justify-center`}
                  >
                    <Icon size={32} className="text-white/90" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                      {machine.name.en}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {machine.targets.primary.en}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
