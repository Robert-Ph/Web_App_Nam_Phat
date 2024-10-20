import Position from "./position.model";
export type Employee = {
  id: number | null;

  fullName: string;
  work_date: string | null;
  phone: string;
  email: string;
  wage: number;

  work: boolean;

  position: Position | string;
};
