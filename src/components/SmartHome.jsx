import { Light } from "./Light";

export function SmartHome(props) {
  const {
    firstLightOn,
    secondLightOn,
    thirdLightOn,
    onFirstToggle,
    onSecondToggle,
    onThirdToggle,
  } = props;

  return (
    <section
      style={{
        fontSize: "5rem",
        display: "grid",
        gridTemplateColumns: "min-content min-content",
        gap: "3px",
        alignItems: "center",
        paddingTop: "1rem",
      }}
    >
      <Light id={0} onToggle={onFirstToggle} />
      <Light id={1} onToggle={onSecondToggle} />
      <Light id={2} onToggle={onThirdToggle} />
    </section>
  );
}
