export const linkToSlug = (link: string): string =>
  link.split("/").at(-1) ?? "";
