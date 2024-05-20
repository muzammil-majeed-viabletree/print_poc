import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Calendar,
  Col,
  DatePicker,
  Drawer,
  Dropdown,
  Input,
  Layout,
  Menu,
  Pagination,
  Row,
  Select,
  Space,
  theme,
} from "antd";
import "./App.css";
const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

const { RangePicker } = DatePicker;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const renderSider = (className) => {
    return (
      <Sider
        width={200}
        style={{
          background: colorBgContainer,
        }}
        className={className}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={items2}
        />
      </Sider>
    );
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>

      <Layout>
        <Drawer
          title="Drawer"
          placement={"left"}
          width={200}
          onClose={onClose}
          open={open}
          style={{ padding: 0 }}
        >
          {renderSider("small-width")}
        </Drawer>

        {renderSider("full-width")}

        <Layout
          style={{
            padding: "0 24px 24px",
            minHeight: "100vh",
          }}
        >
          <Row align={"middle"}>
            <Col span={16}>
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={8}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={showDrawer} className="small-width">
                  Open
                </Button>
              </div>
            </Col>
          </Row>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Pagination defaultCurrent={6} total={500} />
              </Col>

              <Col span={24}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottom"
                  arrow={{
                    pointAtCenter: true,
                  }}
                >
                  <Button>bottom</Button>
                </Dropdown>
              </Col>

              <Col span={24}>
                <Input placeholder="Outlined" />
              </Col>

              <Col span={24}>
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Not Identified",
                    },
                    {
                      value: "2",
                      label: "Closed",
                    },
                    {
                      value: "3",
                      label: "Communicated",
                    },
                    {
                      value: "4",
                      label: "Identified",
                    },
                    {
                      value: "5",
                      label: "Resolved",
                    },
                    {
                      value: "6",
                      label: "Cancelled",
                    },
                  ]}
                />
              </Col>

              <Col span={24}>
                <Calendar />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
