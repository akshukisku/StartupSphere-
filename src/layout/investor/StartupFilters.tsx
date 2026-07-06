"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useInvestorStore } from "@/store/useInvestorStore";

const StartupFilters = () => {
  const {
    industry,
    fundingStage,
    setIndustry,
    setFundingStage,
  } = useInvestorStore();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Select
        value={industry}
        onValueChange={setIndustry}
      >
        <SelectTrigger>
          <SelectValue placeholder="Industry" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Industries
          </SelectItem>

          <SelectItem value="edtech">
            EdTech
          </SelectItem>

          <SelectItem value="healthcare">
            Healthcare
          </SelectItem>

          <SelectItem value="fintech">
            FinTech
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={fundingStage}
        onValueChange={setFundingStage}
      >
        <SelectTrigger>
          <SelectValue placeholder="Funding Stage" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Stages
          </SelectItem>

          <SelectItem value="pre-seed">
            Pre Seed
          </SelectItem>

          <SelectItem value="seed">
            Seed
          </SelectItem>

          <SelectItem value="series-a">
            Series A
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StartupFilters;