"use client";

import { useRecentStartups } from "@/hooks/investor/useInvestor";

import StartupCard from "./StartupCard";

const InvestorRecentStartups = () => {
  const { data, isPending } = useRecentStartups();

  console.log(data)

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">
          Recently Added Startups
        </h2>

        <p className="text-muted-foreground">
          Newly approved startups looking for investors.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((startup) => (
          <StartupCard
            key={startup.id}
            startup={startup}
          />
        ))}
      </div>
    </section>
  );
};

export default InvestorRecentStartups;