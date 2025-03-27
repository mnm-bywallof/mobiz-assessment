type EmploymentType = "Permanent" | "Freelance" | "Intern";

export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  employmentType: EmploymentType;
  joined: Date;
  id?: string;
}

export function convertToDate(str: string) {}
