import { Routes, Route } from "react-router-dom";
import HomeView from "views/homeView/HomeView";
import NoteEditView from "views/noteEditView/NoteEditView";
import NoteShowView from "views/noteShowView/NoteShowView";
import Page404 from "views/page404/Page404";

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
