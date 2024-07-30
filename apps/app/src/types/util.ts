export type Entries<T> = (keyof T extends infer U
  ? U extends keyof T
    ? [U, T[U]]
    : never
  : never)[];

export type EntryValues<T> = (keyof T extends infer U
  ? U extends keyof T
    ? T[U]
    : never
  : never)[];

export type EntryKeys<T> = (keyof T extends infer U
  ? U extends keyof T
    ? T
    : never
  : never)[];

export type Diff<T, U> = Omit<T, keyof U>;

export type UnArray<T> = T extends (infer U)[] ? U : T;

/**オブジェクトの各パラメータをstringに変換する。unionの場合はunionの値が継承される。 */
export type TransformObjString<T> = {
  [K in keyof T]: T[K] extends undefined
    ? undefined
    : T[K] extends string
      ? T[K]
      : string;
};

export type Labels<T extends string> = {
  [K in T]: string;
};
