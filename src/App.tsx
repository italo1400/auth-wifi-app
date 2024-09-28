import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import "antd/dist/reset.css";
import "./index.css";
import { Payment } from "./pages/payment";
import { Flex, Layout } from "antd";
import { contentStyle, layoutStyle } from "./globalStyle";
import { HeaderApp } from "./components/Header";
import { FooterApp } from "./components/Footer";
import { PlanProvider } from "./contexts/PlanContext";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Flex gap="middle" wrap style={{ height: "100vh" }}>
      <PlanProvider>
        <Layout style={layoutStyle}>
          <HeaderApp />
          <Content style={contentStyle}>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment/:id" element={<Payment />} />
              </Routes>
            </Router>
          </Content>
          <FooterApp />
        </Layout>
      </PlanProvider>
    </Flex>
  );
};

export default App;
