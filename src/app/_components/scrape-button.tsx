"use client";

import type { FC } from "react";
import { api } from "~/trpc/react";

type ScrapeButtonProps = {
  urlToScrape?: string;
};

const ScrapeButton: FC<ScrapeButtonProps> = ({ urlToScrape }) => {
  const { refetch, isFetching, data, isError } = api.scrape.scrape.useQuery(
    { url: urlToScrape || "https://vercel.com/pricing" },
    { enabled: false },
  );

  const onScrapeClick = () => {
    refetch();
  };

  return (
    <>
      <button
        className="rounded-lg bg-blue-400 p-4 text-3xl disabled:bg-gray-400"
        onClick={() => onScrapeClick()}
        disabled={isFetching}
        type="button"
      >
        {isFetching ? "Scraping..." : "Scrape!"}
      </button>

      {data && !isFetching && !isError && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
};

export default ScrapeButton;
