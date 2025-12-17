import BooksList from "./components/BooksList";
import Login from "./pages/Login";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>OpenShelf 📚</h1>
      <p>Digital Library Platform</p>
      <Login />
      <BooksList />
    </div>
  );
}

export default App;
