import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PaymentResponse } from "./types";
import { Col, Row, Typography, Spin, Alert, Button, Card } from "antd";
import { io } from "socket.io-client";
import { usePlans } from "../../contexts/PlanContext";
import { BASE_URL } from "../../config/api";
import { createPayment } from "../../services/paymentService";

const { Title, Text } = Typography;

export const Payment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { plans, loading: loadingPlans } = usePlans();
  const [paymentInfo, setPaymentInfo] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<Date | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const selectedPlan = plans.find((plan) => plan.id === Number(id));

  useEffect(() => {
    const handlePayment = async () => {
      if (!selectedPlan) {
        setError("Plano não encontrado");
        setLoading(false);
        return;
      }

      try {
        const response = await createPayment({
          correlationID: new Date().getTime(),
          value: selectedPlan.price,
          comment: selectedPlan.name,
          plan_id: selectedPlan.id,
          mac_address: "NOT_ALLOWED",
        });

        if (!response) {
          throw new Error("Erro ao criar pagamento");
        }

        const data: PaymentResponse = await response;
        setPaymentInfo(data);
        setTimeRemaining(
          data.expires_date ? new Date(data.expires_date) : null
        );

        const socket = io(BASE_URL);

        socket.on(`payment_status`, (status) => {
          setPaymentStatus(status);
          console.log(`Status atualizado: ${status}`);
        });

        return () => {
          socket.disconnect();
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    handlePayment();
  }, [selectedPlan]);

  useEffect(() => {
    if (timeRemaining) {
      const interval = setInterval(() => {
        const now = new Date();
        const remainingTime = timeRemaining.getTime() - now.getTime();
        if (remainingTime <= 0) {
          setTimeRemaining(null);
          clearInterval(interval);
        } else {
          setTimeRemaining(new Date(remainingTime));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  const formatTime = (time: Date) => {
    const totalSeconds = Math.floor(time.getTime() / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (loadingPlans || loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Spin
          tip="Carregando informações de pagamento..."
          size="large"
          style={{ color: "white" }}
        />
      </Row>
    );
  }

  if (error) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Alert message="Erro" description={error} type="error" showIcon />
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ padding: "1rem" }}>
      <Col span={24}>
        <Card
          bordered={false}
          style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}
        >
          <Title level={4} style={{ marginBottom: "1rem" }}>
            Informações do Pagamento
          </Title>

          <Row gutter={[16, 16]} justify="center">
            <Col span={24}>
              <Text strong>Plano:</Text> {paymentInfo?.plan.name}
            </Col>
            <Col span={24}>
              <Text strong>Valor:</Text> R${" "}
              {paymentInfo ? (paymentInfo?.value / 100).toFixed(2) : ""}
            </Col>
            {!paymentStatus && (
              <>
                <Col span={24}>
                  <Text strong>ID da Transação:</Text>{" "}
                  {paymentInfo?.transaction_id}
                </Col>
                <Col span={24}>
                  <Text strong>Código do Pagamento (PIX):</Text>
                  <Text copyable style={{ display: "block", marginTop: "8px" }}>
                    {paymentInfo?.qr_code}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong>Chave PIX:</Text> {paymentInfo?.pix_key}
                </Col>
              </>
            )}
            {timeRemaining && (
              <Col span={24}>
                <Text type="danger">
                  Expira em {formatTime(timeRemaining)} minutos.
                </Text>
              </Col>
            )}
            {!paymentStatus && (
              <Col span={24}>
                <Button
                  type="primary"
                  href={paymentInfo?.payment_link_url}
                  target="_blank"
                >
                  Obter link de pagamento
                </Button>
              </Col>
            )}
          </Row>
          {paymentStatus && (
            <Col span={24} style={{ marginTop: "1rem" }}>
              <Alert message="Pagamento Aprovado!" type="success" showIcon />
            </Col>
          )}
        </Card>
      </Col>
    </Row>
  );
};
