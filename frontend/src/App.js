import { Routes, Route } from "react-router-dom";
import HomeView from "HomeView";
import NoteEditView from "NoteEditView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/write" element={<NoteEditView />} />
    </Routes>
  );
}

export default App;
