import { EnumerizeOptions, EnumRecord, GetTextOptions, Key, Value } from '../types'

const defaultEnumerizeOptions = {
  useCache: true,
  i18nScope: 'domain',
}

export class Enumerize<T extends EnumRecord<T>, IsNullable = false> {
  public readonly map: T

  private readonly options: Required<EnumerizeOptions>

  private invertedMapCache: Record<T[keyof T], keyof T> | null = null

  constructor(map: T, options: EnumerizeOptions) {
    this.map = Object.fromEntries(Object.entries(map).filter(([k, v]) => !k.match(/\d+/))) as T
    this.options = {
      ...options,
      ...defaultEnumerizeOptions,
    }
  }

  get values(): Array<Value<T, false>> {
    return Object.values(this.map)
  }

  get keys(): Array<Key<T, false>> {
    return Object.keys(this.map) as Array<Key<T, false>>
  }

  getName(value: Value<T, IsNullable>): Key<T, IsNullable> {
    return (value === null || value === undefined ? null : this.invertedMap[value as Value<T, false>]) as Key<
      T,
      IsNullable
    >
  }

  getText(value: Value<T, IsNullable>, options: GetTextOptions): string | null {
    const { t, i18nScope } = options
    const fallback = options.fallback ?? null

    if (value) {
      return t(`${this.i18nScope(i18nScope)}.${this.getName(value)}`) || fallback
    }

    return fallback
  }

  i18nScope(overrideScope?: string): string {
    const { name, modelName } = this.options
    const i18nScope = overrideScope ?? this.options.i18nScope
    return `${i18nScope}.${modelName}.${name}`
  }

  get invertedMap(): Record<T[keyof T], keyof T> {
    if (!this.options.useCache || !this.invertedMapCache) {
      this.invertedMapCache = Object.entries<Value<T, false>>(this.map).reduce(
        (mapping: Record<Value<T, false>, Key<T, false>>, [k, v]) => {
          // eslint-disable-next-line no-param-reassign
          mapping[v] = k as Key<T, false>
          return mapping
        },
        {}
      )
    }

    return this.invertedMapCache
  }
}

export function enumerize<T extends EnumRecord<T>, IsNullable = false>(
  map: T,
  options: EnumerizeOptions
): Enumerize<T, IsNullable> {
  return new Enumerize(map, options)
}
