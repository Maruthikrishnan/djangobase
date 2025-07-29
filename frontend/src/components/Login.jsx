import { Button, Checkbox, Form, Input, message } from "antd";

import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    localStorage.setItem("issave", values.remember);
    if (values.remember) {
      localStorage.setItem("username", values.username);
      localStorage.setItem("password", values.password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Axios.post("http://127.0.0.1:8000/api/login/", values, config).then(
      (response) => {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("user", response.data.username);
        message.success("Login success!");
        navigate("/home");
      }
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            initialValue={localStorage.getItem("username")}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            initialValue={localStorage.getItem("password")}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" label={null} valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default App;
