import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { Stack } from "~/lib/types";

type StackCardProps = {
  stack: Stack;
};

const StackCard: FC<StackCardProps> = ({ stack }) => {
  const slug = stack.name?.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link
      href={`/stacks/${slug}`}
      className="rounded-lg border border-gray-600 p-4 shadow"
    >
      <h2 className="text-2xl">{stack.name}</h2>

      <div className="flex gap-2 break-words">
        {stack.technologies.map((tech) => (
          <div key={tech.id}>{tech.provider?.slice(0, 15)}</div>
        ))}
      </div>
    </Link>
  );
};

export default StackCard;
