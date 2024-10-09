export interface IUseCase<P = any, R = any> {
  execute(params: P): Promise<R>;
}
