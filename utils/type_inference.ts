/* eslint-disable @typescript-eslint/no-unused-vars */
export type ExtractInnerType<T extends string> = T extends `${infer _BeforeBracket}(${infer Rest})`
  ? ExtractInnerType<Rest>
  : T
export type ExtractOuterType<T extends string> = T extends `${infer BeforeBracket}(${infer _Rest})`
  ? BeforeBracket
  : T
