import { useState } from "react";
import { Button, Col, Form, Modal, Nav, Row } from "react-bootstrap";
import { store } from "../Store/employees";
import { Employee, EmploymentType } from "../Store/types";
import { observer } from "mobx-react";

const _CreateEditDialog: React.FC<{ employee?: Employee }> = ({ employee }) => {
  const [visible, setVisible] = useState<boolean>(
    employee === undefined ? false : true
  );

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>("Permanent");

  const createNew = () => {
    store.addEmployee({
      email: email,
      employmentType: employmentType,
      firstName: fName,
      lastName: lName,
      joined: new Date(),
    });
  };
  const updateEmployee = () => {
    if (employee) {
      store.updateEmployee({
        firstName: fName,
        lastName: lName,
        email: email,
        employmentType: employmentType,
        joined: employee.joined,
        id: employee.id,
      });
    }
  };
  return (
    <>
      {employee && <></>}
      {!employee && (
        <Nav.Item onClick={() => setVisible(true)}>
          <Nav.Link>Create New Employee</Nav.Link>
        </Nav.Item>
      )}
      <Modal
        show={visible}
        onHide={() => setVisible(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <div
          style={{
            margin: "20px",
            textAlign: "start",
            display: "flex",
            flexFlow: "column",
          }}
        >
          <h1 style={{ textAlign: "center" }}>New Employee</h1>
          <div style={{ padding: "10px", rowGap: "20px" }}>
            <label
              style={{ textAlign: "center", width: "100%", marginBottom: 40 }}
            >
              Specify the new Employee details
            </label>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextFirstName"
              >
                <Form.Label column sm="4">
                  Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    placeholder="John"
                    onChange={(e) => setFName(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextLastName"
              >
                <Form.Label column sm="4">
                  Last Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    placeholder="Doe"
                    onChange={(e) => setLName(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="4">
                  Email
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="email"
                    placeholder="johndoe@getmobiz.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formSelectEmploymentType"
              >
                <Form.Label column sm="4">
                  Employment Type
                </Form.Label>
                <Col sm="8">
                  <Form.Select
                    onChange={(e) =>
                      setEmploymentType(e.target.value as EmploymentType)
                    }
                  >
                    <option id="Permanent">Permanent</option>
                    <option id="Freelance">Freelance</option>
                    <option id="Intern">Intern</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Form>

            <div
              style={{
                padding: "0px",
                display: "flex",
                flexFlow: "row",
                width: "100%",
                gap: 0,
                marginTop: 45,
              }}
            >
              <Button
                variant="success"
                style={{ width: "65%", marginRight: 10 }}
                onClick={employee ? updateEmployee : createNew}
              >
                {employee ? "Update and Continue" : "Save and Continue"}
              </Button>
              <Button
                variant="danger"
                style={{ width: "35%" }}
                onClick={() => {
                  setVisible(false);
                  store.employeeRequestUpdate = null;
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const CreateEditDialog = observer(_CreateEditDialog);
export default CreateEditDialog;
