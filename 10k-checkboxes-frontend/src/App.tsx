import { CheckboxGrid } from "./components/CheckboxGrid";
import { useCheckboxes } from "./hooks/useCheckboxes";
import { COUNT } from "./utils/constants";

function App() {
  const { checkboxes, toggleCheckbox } = useCheckboxes(COUNT);

  return (
    <main>
      <h1>Realtime Checkbox Playground</h1>

      <p>Total Checkboxes: {checkboxes.length}</p>

      <CheckboxGrid checkboxes={checkboxes} onToggle={toggleCheckbox} />
    </main>
  );
}

export default App;
