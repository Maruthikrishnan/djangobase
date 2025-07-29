import React, { useState } from "react";

import { Button, Flex, message, Typography } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Axios from "axios";
import Updatetaskmodel from "./Updatetaskmodel.jsx";

const { Text, Title } = Typography;

export default function Taskview({ task, refereshTask }) {
  const token = localStorage.getItem("token");
  const [isupdatemodel, setUpdateModel] = useState(false);
  const deleteButton = (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    Axios.delete(
      `http://127.0.0.1:8000/api/removetask/${task.id}`,
      config
    ).then((response) => {
      message.success(response.data);
      refereshTask();
    });

    e.stopPropagation();
  };

  const updateDone = (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    task.iscompleted = !task.iscompleted;

    console.log(task);
    Axios.put(
      `http://127.0.0.1:8000/api/updatetask/${task.id}`,
      task,
      config
    ).then((response) => {
      message.success(response.data);
      refereshTask();
    });

    e.stopPropagation();
  };

  return (
    <div
      className="task"
      style={{ backgroundColor: task.iscompleted ? "#cffee3ff" : "#ccd8fcff" }}
    >
      <div className="tasktext">
        <Text delete={task.iscompleted} style={{ fontSize: "1.5rem" }}>
          {task.taskname}
        </Text>

        <Text>{task.taskdetails == "" ? "..." : task.taskdetails}</Text>
      </div>

      <div className="tasktext">
        <Text>Due date: {task.duedate}</Text>
        <Flex gap="small" justify="right">
          <Button
            shape="circle"
            onClick={(e) => {
              e.stopPropagation();
              setUpdateModel(true);
            }}
            icon={<EditFilled />}
          />
          <Button
            shape="circle"
            onClick={(e) => deleteButton(e)}
            icon={<DeleteFilled />}
          />
        </Flex>
      </div>
      <Updatetaskmodel
        refereshTask={refereshTask}
        isModalOpen={isupdatemodel}
        task={task}
        setIsModalOpen={setUpdateModel}
      />
    </div>
  );
}
