import { api, HydrateClient } from "~/trpc/server";
import Splash from "./_components/splash";
import StackList from "./_components/stack-list";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const stacks = await api.stack.getStacks();

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
          <StackList stacks={stacks} />
        </section>
      </div>
    </HydrateClient>
  );
}
