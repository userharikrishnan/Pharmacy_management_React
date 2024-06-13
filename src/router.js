import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ListMedicines from "./components/pharma/listMedicines";
import CreateMedicines from "./components/pharma/createMedicines";
import ViewMedicines from "./components/pharma/viewMedicines";
import EditMedicines from "./components/pharma/editMedicines";
import Register from "./components/auth/register";
import Login from "./components/auth/Login";
import Aboutus from "./components/Aboutus";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: '/listmedicines', element: <ListMedicines/> },
    { path: '/create', element: <CreateMedicines/> },
    { path: '/listmedicines/:postId', element: <ViewMedicines/> },
    { path : '/listmedicines/:postId/edit', element: <EditMedicines/>},
    { path: 'register', element:<Register/>},
    { path: 'Login', element:<Login/>},
    { path: 'aboutus', element:<Aboutus/>},

]);

export default router;