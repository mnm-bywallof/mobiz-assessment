import { makeAutoObservable } from "mobx";
import { Employee } from "./types";
import axios from "axios";
import { touchRippleClasses } from "@mui/material";

//A class to contain the state managment logic
export class EmployeeStore {
  employees: Employee[] = [];
  employeeRequestUpdate: Employee | null = null;
  loading: boolean = false;
  constructor() {
    makeAutoObservable(this);
    if (this.employees.length === 0) this.autoLoadEmployees();
  }

  private async autoLoadEmployees() {
    //TODO API Request (GET)
    this.loading = true;
    await axios
      .get("https://mobiz-backend-990423892517.us-central1.run.app/employees")
      .then((r) => {
        console.log(r.data);
        this.employees = r.data as Employee[];
        console.warn(this.employees);
      })
      .catch((e) => {
        console.error(e);
      });

    this.loading = false;
  }

  public async addEmployee(emp: Employee) {
    this.loading = true;
    await axios
      .post(
        "https://mobiz-backend-990423892517.us-central1.run.app/employees",
        emp
      )
      .then((r) => {
        console.log(r.data);
        this.loading = false;
      })
      .catch((e) => {
        console.error(e);
        this.loading = false;
      });

    this.loading = false;
    this.autoLoadEmployees();
  }

  public async deleteEmployee(emp: Employee) {
    this.loading = true;
    await axios
      .delete(
        `https://mobiz-backend-990423892517.us-central1.run.app/employee/${emp.id}`
      )
      .then((r) => {
        console.log(r.data);
        this.loading = false;
      })
      .catch((e) => {
        console.error(e);
        this.loading = false;
      });

    this.autoLoadEmployees();
  }

  public async updateEmployee(emp: Employee) {
    this.loading = true;

    await axios
      .put(
        "https://mobiz-backend-990423892517.us-central1.run.app/employee",
        emp
      )
      .then((r) => {
        console.log(r.data);
        this.loading = false;
      })
      .catch((e) => {
        console.error(e);
        this.loading = false;
      });

    this.employeeRequestUpdate = null;
    this.loading = false;
    this.autoLoadEmployees();
  }
}

export const store = new EmployeeStore();
