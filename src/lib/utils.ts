import externalSlugify from "slugify";

export function slugify(string: string) {
  return externalSlugify(string, { lower: true });
}
