import type { FC } from "react";
import type { Stack } from "~/lib/types";
import StackCard from "./stack-card";

type StackListProps = {
  stacks: Stack[];
};

const StackList: FC<StackListProps> = ({ stacks }) => {
  return (
    <div>
      <h1 className="text-3xl">Stack list</h1>

      {stacks.map((stack) => {
        return (
          <div key={stack.id}>
            <StackCard stack={stack} />
          </div>
        );
      })}
    </div>
  );
};

export default StackList;
