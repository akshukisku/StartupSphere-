"use client";

import { Button } from "@/components/ui/button";
import { useInvestorStore } from "@/store/useInvestorStore";

interface StartupPaginationProps {
  totalPages: number;
}

const StartupPagination = ({
  totalPages,
}: StartupPaginationProps) => {
  const { page, setPage } = useInvestorStore();

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default StartupPagination;