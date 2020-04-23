export enum InsightFilterType {
  Question = 'QUESTION',
  User = 'USER'
}

export type InsightFilterKey<
  T extends InsightFilterType = any
> = T extends InsightFilterType.Question
  ? {
      type: InsightFilterType.Question
      value: string
    }
  : {
      type: InsightFilterType.User
    }

export type InsightFilterValue<T extends InsightFilterType = any> = { value: string }

export type InsightFilter<T extends InsightFilterType = any> = {
  key: InsightFilterKey<T>
  value: InsightFilterValue<T>
}
