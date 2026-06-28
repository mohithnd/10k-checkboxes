import { CheckboxGrid } from "./components/CheckboxGrid";
import { PageHeader } from "./components/PageHeader";
import { useCheckboxes } from "./hooks/useCheckboxes";
import { COUNT } from "./utils/constants";

function App() {
  const { checkboxes, toggleCheckbox } = useCheckboxes(COUNT);

  return (
    <main>
      <PageHeader total={checkboxes.length} />

      <CheckboxGrid checkboxes={checkboxes} onToggle={toggleCheckbox} />
    </main>
  );
}

export default App;
