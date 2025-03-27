import { observer } from "mobx-react";
import { Container, Nav, Navbar } from "react-bootstrap";
import CreateEditDialog from "./CreateEditDialog";
import { store } from "../Store/employees";

const _TopNavBar: React.FC = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={
                "https://cdn.prod.website-files.com/64d5148d08487ce19be14741/64df848bd554afda7be46517_5f2ac85c9fc48660ffbdfd78_Mobiz_Logo_Blue_Dark.jpg-p-500%20(1).png"
              }
              width="100"
              className="d-inline-block"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link>{`Refresh (${store.employees.length})`}</Nav.Link>
            </Nav.Item>
            <CreateEditDialog />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export const TopNavBar = observer(_TopNavBar);
