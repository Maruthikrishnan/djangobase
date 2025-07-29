import { Button, Col, Menu, message, Row } from "antd";
import React from "react";
import "./css/test.css";
export default function Test() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = () => {
    message.success("hellowworld");
  };
  return (
    <>
      <Button onClick={() => openMessage()}>message</Button>
      <div className="div2"></div>
      <div className="div1"></div>
      <div className="div2"></div>
      <div className="div3"></div>
    </>
  );
}
