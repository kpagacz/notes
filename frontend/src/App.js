import { Routes, Route } from "react-router-dom";
import HomeView from "views/homeView/HomeView";
import NoteEditView from "views/NoteEditView";
import NoteShowView from "views/NoteShowView";
import Page404 from "views/Page404";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeView />} />
      <Route exact path="/write" element={<NoteEditView />} />
      <Route exact path="/notes/:id" element={<NoteShowView />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
