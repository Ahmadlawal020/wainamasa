export const ROLES = {
  Admin: "Admin",
  Employee: "Employee",
  SuperAdmin: "SuperAdmin",
} as const;

export type Role = keyof typeof ROLES;
export type RoleValue = (typeof ROLES)[Role];
