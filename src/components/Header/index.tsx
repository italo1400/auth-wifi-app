import { Layout } from "antd";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
  fontSize: "1.5rem",
};

export const HeaderApp = () => <Header style={headerStyle}>WifiGate</Header>;
