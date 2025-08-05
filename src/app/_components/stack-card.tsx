import Link from "next/link";
import type { FC } from "react";
import type { Stack } from "~/lib/types";

type StackCardProps = {
  stack: Stack;
};

const StackCard: FC<StackCardProps> = ({ stack }) => {
  return (
    <Link href={`/stacks/${stack.id}`}>
      {stack.name}
      <ul>
        {stack.technologies.map((tech) => (
          <li key={tech.id}>
            {tech.provider} ({tech.freeTier ? "Has Free Tier" : null})
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default StackCard;
