export type PascalToKebab<
  STRING,
  FIRST extends boolean = true
> = STRING extends `${infer CHAR}${infer NEXT}`
  ? `${CHAR extends Uppercase<CHAR>
      ? `${FIRST extends true ? '' : '-'}${Lowercase<CHAR>}`
      : CHAR}${PascalToKebab<NEXT, false>}`
  : STRING
