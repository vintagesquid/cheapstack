import { HydrateClient, api } from "~/trpc/server";
import Splash from "./_components/splash";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <HydrateClient>
      <div className="container flex flex-col items-center justify-center gap-12 px-4">
        <Splash />

        <section id="home" className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </section>

        <section id="stacks">
          <h1 className="text-2xl">stacks</h1>
        </section>
      </div>
    </HydrateClient>
  );
}
