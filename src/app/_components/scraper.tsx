"use client";

import { type FC, useState } from "react";
import ScrapeButton from "./scrape-button";

const Scraper: FC = () => {
  const [urlToScrape, setUrltoScrape] = useState("");

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <label className="flex items-center gap-4">
        <span className="text-2xl">Enter a URL to scrape:</span>
        <input
          onChange={(e) => {
            setUrltoScrape(e.target.value);
          }}
          className="rounded border border-amber-400 p-2"
        />
      </label>

      <ScrapeButton urlToScrape={urlToScrape} />
    </div>
  );
};

export default Scraper;
