import { Layout } from "antd";

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

export const FooterApp = () => <Footer style={footerStyle}>ProverTech </Footer>;
