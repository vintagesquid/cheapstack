import type { FC } from "react";
import type { Stack } from "~/lib/types";
import StackCard from "./stack-card";

type StackListProps = {
  stacks: Stack[];
};

const StackList: FC<StackListProps> = ({ stacks }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stacks.map((stack) => {
        return <StackCard key={stack.id} stack={stack} />;
      })}
    </div>
  );
};

export default StackList;
