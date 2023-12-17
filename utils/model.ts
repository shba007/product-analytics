export type Feature = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface DataPoint {
  date: string;
  age: 'teen' | 'adult';
  gender: 'male' | 'female';
  feature: { [key in Feature]: number };
}

export interface Filters {
  age: 'all' | 'teen' | 'adult'
  gender: 'all' | 'male' | 'female'
  date: {
    start: string,
    end: string
  }
}