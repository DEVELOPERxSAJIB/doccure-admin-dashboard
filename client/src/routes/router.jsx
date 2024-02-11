import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter";
import privateRouter from "./privateRouter";

// create browser route
const router = createBrowserRouter([...publicRouter, ...privateRouter]);

// export router
export default router;
