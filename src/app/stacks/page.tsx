import type { FC } from "react";
import { api } from "~/trpc/server";
import StackList from "../_components/stack-list";

export const dynamic = "force-static";

const StacksPage: FC = async () => {
  const stacks = await api.stack.getStacks();

  return (
    <div className="space-y-8">
      <h1 className="text-center text-3xl">Stacks</h1>
      <StackList stacks={stacks} />
    </div>
  );
};

export default StacksPage;
