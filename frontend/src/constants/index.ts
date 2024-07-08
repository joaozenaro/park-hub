import { ISelectOption } from "../models/ISelectOption";

export const ROLES = {
  employee: "employee",
  admin: "admin",
};
Object.freeze(ROLES);

export const ROLES_LABEL = {
  employee: "Funcionário",
  admin: "Administrador",
};
Object.freeze(ROLES_LABEL);

export const ROLES_OPTIONS: ISelectOption[] = [
  { value: ROLES.admin, label: ROLES_LABEL.admin },
  { value: ROLES.employee, label: ROLES_LABEL.employee },
];
Object.freeze(ROLES_OPTIONS);

export const TIME_RANGE_OPTIONS = [
  { label: "7d", value: "week" },
  { label: "30d", value: "month" },
  { label: "12m", value: "year" },
];
Object.freeze(TIME_RANGE_OPTIONS);
