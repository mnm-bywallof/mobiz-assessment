import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";
import Employees from "./Screens/employees";
import { TopNavBar } from "./Components/Toolbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>Home</>,
  },
  {
    path: "/employee",
    element: <Employees />,
  },
  {
    path: `/employee/:employeeID`,
    element: <>Employee</>,
  },
]);

function App() {
  return (
    <>
      <TopNavBar />
      <Container style={{ marginTop: "50px" }}>
        <RouterProvider router={router} />
      </Container>
    </>
  );
}

export default App;
