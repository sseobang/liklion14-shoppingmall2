import {BrowserRouter, Routes, Route} from "react-router-dom";
import RootLayout from "../src/layout/RootLayout.jsx";
import Main from "../src/pages/Main/Main.jsx"
import ItemDetail from "./pages/ItemDetail/ItemDetail.jsx";
import ItemAdd from "./pages/ItemAdd/ItemAdd.jsx";
import ItemEdit from "./pages/ItemEdit/ItemEdit.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<ItemAdd />}/>
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/edit/:id" element={<ItemEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;