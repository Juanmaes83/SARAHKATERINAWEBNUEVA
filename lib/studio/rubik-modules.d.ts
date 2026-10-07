declare module '@rubik/seo-geo-core/content' {
  const core: { unsafePathReason(path: string): string };
  export default core;
}
declare module '@rubik/seo-geo-core/adapters' {
  const adapters: { describe(config: unknown): { id: string } };
  export default adapters;
}
