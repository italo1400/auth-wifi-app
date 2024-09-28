import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Typography, Spin } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import { usePlans } from "../contexts/PlanContext";

const { Text } = Typography;

const cardStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "left",
  height: "100px",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

const circleStyle: React.CSSProperties = {
  position: "absolute",
  left: "-15px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "80px",
  height: "80px",
  borderRadius: "0px 25px 25px 25px",
  backgroundColor: "#ff4d4f",
  alignContent: "center",
  color: "white",
  fontSize: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const textStyle: React.CSSProperties = {
  marginLeft: "50px",
  fontSize: "1rem",
};

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { plans, loading } = usePlans();

  const handleCardClick = (id: number) => {
    navigate(`/payment/${id}`);
  };

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24}>
        <Text style={{ color: "white", fontSize: "1.2rem" }}>
          Escolha um dos nossos planos e desbloqueie o acesso à internet de
          forma rápida e fácil.
        </Text>
      </Col>

      {loading ? (
        <Col span={24} style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
        </Col>
      ) : (
        plans.map((plan) => (
          <Col key={plan.id} span={24}>
            <Card
              bordered={false}
              style={cardStyle}
              onClick={() => handleCardClick(plan.id)}
            >
              <div style={circleStyle}>
                <FieldTimeOutlined style={{ fontSize: "3.5rem" }} />
              </div>
              <div style={textStyle}>
                <Text style={{ fontSize: "1.3rem" }} strong>
                  {plan.name}
                </Text>
                <br />
                <Text>Duração: {plan.duration_minutes} minutos</Text>
                <br />
                <Text>Preço: R$ {plan.price / 100},00</Text>
              </div>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};
