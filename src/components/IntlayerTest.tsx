import { useIntlayer } from "react-intlayer";

export default function IntlayerTest() {
  const { greeting } = useIntlayer("app");
  return (
    <div style={{ padding: "1rem", background: "#1e1e1e", color: "#fff" }}>
      {greeting}
    </div>
  );
}