import { CheckboxGrid } from "./components/CheckboxGrid";
import { useCheckboxes } from "./hooks/useCheckboxes";

function App() {
  const { checkboxes, toggleCheckbox } = useCheckboxes(10000);

  return (
    <main>
      <h1>Realtime Checkbox Playground</h1>

      <p>Total Checkboxes: {checkboxes.length}</p>

      <CheckboxGrid checkboxes={checkboxes} onToggle={toggleCheckbox} />
    </main>
  );
}

export default App;
