import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { map } from "lodash";
import { routes } from "./routes";
import { useEffect } from "react";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      {map(routes, (elem, index)=>{
        const { path, component } = elem;
        return <Route key={index} path={path} element={component} />
      })}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
