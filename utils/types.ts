export interface Data {
  id: string;
  row: number;
  age: number;
  gender: string;
}

export interface TableData {
  [key: number]: Data[];
}
