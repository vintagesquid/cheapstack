import { slugify } from "~/lib/utils";
import { trpcSSGHelper } from "~/trpc/server";

type Params = {
  slug: string;
};

export async function generateStaticParams(): Promise<Partial<Params>[]> {
  const stacks = await trpcSSGHelper.stack.getStacks.fetch();

  return stacks.map((stack) => ({
    slug: slugify(stack.name || ""),
  }));
}

export default async function StackPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return <h1 className="text-center text-3xl">{slug}</h1>;
}
