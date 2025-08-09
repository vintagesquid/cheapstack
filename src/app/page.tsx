import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import Scraper from "./_components/scraper";
import Splash from "./_components/splash";
import StackList from "./_components/stack-list";

export default async function Home() {
  const stacks = await api.stack.getStacks({ limit: 9 });

  return (
    <HydrateClient>
      <div className="container flex flex-col items-center justify-center gap-12 px-4">
        <section id="home" className="flex flex-col items-center gap-2">
          <Splash />
        </section>

        <section id="stacks" className="space-y-8">
          <h1 className="text-center text-3xl">Stack list</h1>

          <StackList stacks={stacks} />

          <div className="text-center">
            <Link href={"/stacks"} className="rounded border px-2 py-1">
              Browse more stacks...
            </Link>
          </div>
        </section>

        <Scraper />
      </div>
    </HydrateClient>
  );
}
