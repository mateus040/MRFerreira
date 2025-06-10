export default interface ServiceResult<T = null> {
  data: T | null;
  message: string | Record<string, string[]>;
}
