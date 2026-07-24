"use client";

import { useState } from "react";
import machinesData from "@/data/machines.json";
import Link from "next/link";
import { Footprints, Activity, Dumbbell } from "lucide-react";

const categoryIcons = {
  legs: Footprints,
  back: Activity,
};

const languages = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
  { code: "ar", label: "عربي" },
  { code: "ml", label: "മല" },
];

const labels = {
  targets: { en: "Targets:", hi: "लक्ष्य:", ar: "الهدف:", ml: "ലക്ഷ്യങ്ങൾ:" },
  howToUse: {
    en: "How to use",
    hi: "उपयोग कैसे करें",
    ar: "كيفية الاستخدام",
    ml: "എങ്ങനെ ഉപയോഗിക്കാം",
  },
  commonMistakes: {
    en: "Common mistakes",
    hi: "सामान्य गलतियां",
    ar: "الأخطاء الشائعة",
    ml: "സാധാരണ തെറ്റുകൾ",
  },
  primary: { en: "primary", hi: "प्राथमिक", ar: "أساسي", ml: "പ്രാഥമികം" },
  secondary: { en: "secondary", hi: "द्वितीयक", ar: "ثانوي", ml: "ദ്വിതീയം" },
  back: { en: "← Back", hi: "← वापस", ar: "→ رجوع", ml: "← തിരികെ" },
};

export default function MachinePage({ params }) {
  const [lang, setLang] = useState("en");
  const { machines } = machinesData;

  const resolvedParams = require("react").use(params);
  const machine = machines.find((m) => m.id === resolvedParams.id);

  if (!machine) {
    return (
      <main
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="p-4 md:p-8 w-full max-w-2xl md:max-w-[95%] mx-auto"
      >
        <p>Machine not found.</p>
        <Link href="/" className="text-blue-600 underline">
          Back to home
        </Link>
      </main>
    );
  }

  // Fallback to English if a translation is missing
  const t = (field) => field[lang] || field["en"];

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-950 text-white"
    >
      <div className="p-4 md:p-8 w-full max-w-2xl md:max-w-[95%] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            ← Back
          </Link>
          <div className="flex gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all duration-200 ${
                  lang === l.code
                    ? "bg-blue-600 text-white scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 animate-fade-in">
          {(() => {
            const Icon = categoryIcons[machine.category] || Dumbbell;
            return (
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600/10 text-blue-400 p-2 rounded-lg">
                  <Icon size={24} />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {machine.name.en}
                </h1>
              </div>
            );
          })()}

          <p className="mb-6 text-gray-300">
            <span className="font-semibold text-white">Targets:</span>{" "}
            {t(machine.targets.primary)} (primary),{" "}
            {t(machine.targets.secondary)} (secondary)
          </p>

          {machine.videoUrl && (
            <div className="mb-6 aspect-video rounded-lg overflow-hidden">
              <iframe
                src={machine.videoUrl}
                title={`${machine.name.en} demo video`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          <h2 className="text-lg font-semibold mb-3 text-blue-400">
            How to use
          </h2>
          <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-200">
            {t(machine.steps).map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h2 className="text-lg font-semibold mb-3 text-blue-400">
            Common mistakes
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            {t(machine.commonMistakes).map((mistake, i) => (
              <li key={i}>{mistake}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
