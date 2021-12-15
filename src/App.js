import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { map } from "lodash";
import { routes } from "./routes";

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
