export const mocked = <T extends (...args: any) => any>(f: T) =>
  f as unknown as jest.Mock<ReturnType<T>, Parameters<T>>;
