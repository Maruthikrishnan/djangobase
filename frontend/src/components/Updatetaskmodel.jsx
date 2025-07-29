import { Button, Checkbox, Flex, message, Modal } from "antd";
import React from "react";
import { DatePicker, Form, Input } from "antd";
import Axios from "axios";
import dayjs from "dayjs";

export default function Updatetaskmodel({
  isModalOpen,
  setIsModalOpen,
  refereshTask,
  task,
}) {
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    form.resetFields();

    if (!values["duedate"]) {
      values["duedate"] = dayjs().format("YYYY-MM-DD");
    } else {
      values["duedate"] = values["duedate"].format("YYYY-MM-DD");
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    Axios.put(
      `http://127.0.0.1:8000/api/updatetask/${task.id}`,
      values,
      config
    ).then((response) => {
      message.success(response.data);
    });
    refereshTask();
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    message.success(errorInfo);
  };

  return (
    <Modal
      title="Update Task"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: false }}
      >
        <Form.Item
          label="Task Name"
          name="taskname"
          initialValue={task.taskname}
          rules={[{ required: true, message: "Please input your Task name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Task Details"
          name="taskdetails"
          initialValue={task.taskdetails}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="duedate"
          initialValue={dayjs(task.duedate)}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="iscompleted"
          valuePropName="checked"
          initialValue={task.iscompleted}
        >
          <Checkbox>Task Completed</Checkbox>
        </Form.Item>
        <Form.Item label={null}>
          <Flex wrap gap="small">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
}
