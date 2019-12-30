import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Avatar } from "antd";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ErrorPage from "../pages/Error";
import BrandInfoPage from "../pages/Brand/Info";
import RegisterBrandAdminPage from "../pages/Admin/RegisterBrand";
import RegisterUserAdminPage from "../pages/Admin/RegisterUser";
import Store from "./Store";
import { observer } from 'mobx-react'
import ListBrandsAdminPage from "../pages/Admin/ListBrands";
import ListUsersAdminPage from "../pages/Admin/ListUsers";
import { AnimatedSwitch } from 'react-router-transition'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles: any) {
  return {
    opacity: styles.opacity,
    transform: `translateY(${styles.offset}%)`,
  };
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    offset: -4,
    opacity: 0,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    offset: 4,
    opacity: 0,
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    offset: 0,
    opacity: 1,
  },
};

@observer
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Sidebar} />
        </Switch>
      </Router>
    );
  }
}

interface SidebarProps extends RouteComponentProps<any> {}

interface SidebarState {
  collapsed: boolean;
}

interface SettingsMenuItem {
  link: string;
  name: string;
}

@observer
class Sidebar extends React.Component<SidebarProps, SidebarState> {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  splitPath = (path: string) => {
    const splitPath = path.split("/");
    let endPaths = [splitPath[0]];
    if (splitPath.length >= 2) {
      for (let i = 1; i <= splitPath.length - 1; i++) {
        endPaths.push(endPaths[i - 1] + "/" + splitPath[i]);
      }
    }

    return endPaths;
  };

  getAvatarName = () => {
    const regex = /[aeiouy]/gi
    const name = Store.user?.name
    if (!name) {
      return '?'
    }

    const vowels = name.match(regex)
    if (!vowels) {
      return name.substr(0, 3)
    }
    
    let l = name.indexOf(vowels[0])
    if (l > 3) {
      return name.substr(0, 3)
    }
    const l2 = name.indexOf(vowels[1])
    if (l == 0 && l2 < 3) {
      l = l2
    }

    return name.substr(0, l + 1)
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="dark" collapsed={true}>
          <Menu
            theme="dark"
            defaultSelectedKeys={this.splitPath(this.props.location.pathname)}
            mode="inline"
          >
            <Menu.SubMenu
              style={{
                position: 'absolute',
                bottom: 4,
              }}
              key="account"
              title={
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    transform: "translateX(-11px)"
                  }}
                >
                  <i className="anticon">
                    {" "}
                    <Avatar
                      size={36}
                      style={{
                        fontSize: "30",
                        color: "#fffff",
                        backgroundColor: "#333"
                      }}
                    >
                      {this.getAvatarName().toUpperCase()}
                    </Avatar>
                  </i>
                  <span>Account</span>
                </div>
              }
            >
              <Menu.ItemGroup key="settings" title="Settings">
                <Menu.Item key={"settings-logout"}>
                  <Link to="/user/settings">Account</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Item
                key="lo"
                // @ts-ignore
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, .15)"
                }}
              >
                <a
                  onClick={(e: any) => {
                    e.stopPropagation();
                    //props.logout()
                  }}
                >
                  <span>Log out</span>
                </a>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Sider
          theme="light"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu
            theme="light"
            defaultSelectedKeys={this.splitPath(this.props.location.pathname)}
            defaultOpenKeys={this.splitPath(this.props.location.pathname)}
            mode="inline"
          >
            <div className="logo" />
            <Menu.Item key="/dashboard">
              <Link to="/dashboard">
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/brand/info">
              <Link to="/brand/info">
                <Icon type="form" />
                <span>Brand info</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/brand/products">
              <Link to="/brand/products">
                <Icon type="desktop" />
                <span>Products</span>
              </Link>
            </Menu.Item>

            <SubMenu
              key="/admin"
              title={
                <span>
                  <Icon type="crown" />
                  <span>Admin</span>
                </span>
              }
            >
              <Menu.Item key="/admin/registerbrand">
                <Link to="/admin/registerbrand">
                  <Icon type="file-add" />
                  <span>Register brand</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="/admin/registeruser">
                <Link to="/admin/registeruser">
                  <Icon type="user-add" />
                  <span>Register user</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/admin/listbrands">
                <Link to="/admin/listbrands">
                  <Icon type="database" />
                  <span>List brands</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/admin/listusers">
                <Link to="/admin/listusers">
                  <Icon type="database" />
                  <span>List users</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="bug" />
                  <span>Debug</span>
                </span>
              }
            >
              <Menu.Item key="/login">
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="e">Error</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <AnimatedSwitch
    atEnter={bounceTransition.atEnter}
    atLeave={bounceTransition.atLeave}
    atActive={bounceTransition.atActive}
    mapStyles={mapStyles}
    className="route-wrapper"
  >
            <Route path="/brand/info/:brandId" component={BrandInfoPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route
              path="/admin/registerbrand"
              component={RegisterBrandAdminPage}
            />
            <Route
              path="/admin/registeruser"
              component={RegisterUserAdminPage}
            />
            <Route
              path="/admin/listbrands"
              component={ListBrandsAdminPage}
            />
            <Route
              path="/admin/listusers"
              component={ListUsersAdminPage}
            />
            <Route path="/" component={ErrorPage} />
          </AnimatedSwitch>

          <Footer style={{ textAlign: "center", opacity: 0 }}>
            Booster ©{new Date().getFullYear()} created by Booster tech team
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
