import { ISelectOption } from "../models/ISelectOption";

export const ROLES = {
  employee: "employee",
  admin: "admin",
};
Object.freeze(ROLES);

export const ROLES_OPTIONS: ISelectOption[] = [
  { value: ROLES.admin, label: "Administrador" },
  { value: ROLES.employee, label: "Funcionário" }
];
Object.freeze(ROLES_OPTIONS);