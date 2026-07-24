import Link from 'next/link';
import machinesData from '@/data/machines.json';

export default function Home() {
  const { categories, machines } = machinesData;

  return (
    <main className="p-4 md:p-8 w-full max-w-2xl md:max-w-[95%] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Staff Gym Guide</h1>

      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{category.name.en}</h2>
          <ul className="space-y-2">
            {machines
              .filter((m) => m.category === category.id)
              .map((machine) => (
                <li key={machine.id}>
                  <Link
                    href={`/machine/${machine.id}`}
                    className="text-blue-600 underline"
                  >
                    {machine.name.en}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </main>
  );
}