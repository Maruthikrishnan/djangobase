import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./css/home.css";
import { Col, Dropdown, Row, Space, Typography } from "antd";
import {
  DownOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Taskview from "./Taskview.jsx";
import Addtaskmodel from "./Addtaskmodel.jsx";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

function Home() {
  const [user, setUser] = useState();
  const [task, setTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    Axios.get("http://127.0.0.1:8000/api/task/", config).then((response) => {
      setTask(response.data);
    });
  }, [refreshTrigger]);

  function refereshTask() {
    setRefreshTrigger(refreshTrigger + 1);
  }

  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Add task",
      icon: <UserAddOutlined />,
    },

    {
      key: "3",
      label: "Logout",
      icon: <SettingOutlined />,
    },
  ];
  const handleMenuClick = (e) => {
    if (e.key == 2) {
      setIsModalOpen(true);
    } else if (e.key == 3) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <>
      {user && (
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xl={16} xxl={12} md={20} sm={24} xs={24}>
            <div className="bar">
              <Title level={3}>Tasks todo</Title>
              <Dropdown menu={menuProps}>
                <a
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "black", fontSize: "1.2rem" }}
                >
                  <Space>
                    {user?.toUpperCase()}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            {task.map((t, i) => (
              <Taskview key={i} task={t} refereshTask={refereshTask} />
            ))}
            <Addtaskmodel
              refereshTask={refereshTask}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default Home;
