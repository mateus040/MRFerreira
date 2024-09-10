export default interface ServiceResult<T = null> {
  results: T | null;
  message: string | Record<string, string[]>;
}
