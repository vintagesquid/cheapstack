import Link from "next/link";
import type { FC } from "react";
import type { Stack } from "~/lib/types";
import { slugify } from "~/lib/utils";

type StackCardProps = {
  stack: Stack;
};

const StackCard: FC<StackCardProps> = ({ stack }) => {
  const slug = slugify(stack.name || "");

  return (
    <Link
      href={`/stacks/${slug}`}
      className="relative rounded-lg border border-slate-600 p-6 shadow"
    >
      <div
        className="absolute inset-2"
        style={{
          backgroundImage: "url('/images/diagonal-lines.svg')",
          backgroundSize: "24px",
          opacity: 0.165,
        }}
      ></div>

      <div className="space-y-2">
        <h2 className="text-2xl">{stack.name}</h2>
        <div className="flex flex-wrap gap-2 break-words">
          {stack.technologies.map((tech) => (
            <div key={tech.id}>{tech.provider?.slice(0, 15)}</div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default StackCard;
