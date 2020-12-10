export interface EnumerizeOptions {
  useCache?: boolean
  name: string
  i18nScope?: string
  modelName: string
}

export interface GetTextOptions {
  t: (...args: any) => any
  fallback?: string
  i18nScope?: EnumerizeOptions['i18nScope']
}

export type Key<T, IsNullable> = IsNullable extends true ? keyof T | null : keyof T

export type Value<T, IsNullable> = IsNullable extends true ? T[keyof T] | null : T[keyof T]

export type EnumRecord<T> = Record<Key<T, false>, Value<T, false>>
