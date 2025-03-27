import { observer } from "mobx-react";
import { Table } from "react-bootstrap";
import ContextMenu from "../Components/ContextMenu";
import { store } from "../Store/employees";
import LoadingIcon from "../Assets/work-in-progress.gif";

const _Employees: React.FC = () => {
  if (store.loading === true) {
    return (
      <img
        src={LoadingIcon}
        height={120}
        style={{ display: "flex" }}
        alt="Loading Icon"
      />
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Employment type</th>
            <th>Joined</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {store.employees.map((emp, i) => (
            <tr key={emp.id}>
              <td>{i + 1}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.employmentType}</td>
              <td>{""}</td>
              <td>
                <ContextMenu employee={emp} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

const Employees = observer(_Employees);

export default Employees;
