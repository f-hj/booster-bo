import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Avatar, Select, Typography } from "antd";
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
import store from "./Store";
import WelcomePage from "../pages/Welcome";
import UserInfoPage from "../pages/Admin/InfoUser";
import ListProductsPage from "../pages/Product/Products";
import AddProductPage from "../pages/Product/AddProduct";
import ProductInfoPage from "../pages/Product/Info";
import UserAvatar from "../components/AvatarUser";

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

const translationTransition = {
  atEnter: {
    offset: -4,
    opacity: 0,
  },
  atLeave: {
    offset: 4,
    opacity: 0,
  },
  atActive: {
    offset: 0,
    opacity: 1,
  },
};

const opacityTransition = {
  atEnter: {
    opacity: 0,
  },
  atLeave: {
    opacity: 0,
  },
  atActive: {
    opacity: 1,
  },
};

@observer
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <AnimatedSwitch
            atEnter={opacityTransition.atEnter}
            atLeave={opacityTransition.atLeave}
            atActive={opacityTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
          >
          <Route path="/login" component={Login} />
          <Route path="/" component={Sidebar} />
        </AnimatedSwitch>
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
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="dark"
          style={{
            backgroundImage: 'linear-gradient(to top, #f43b47 0%, #453a94 100%)',
          }}
          collapsed={true}
        >
          <Typography.Title
            style={{
              margin: '0.4em auto',
              color: 'white',
              writingMode: 'vertical-lr',
            }}
          >Booster</Typography.Title>
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
                    <UserAvatar user={Store.user} />
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
            <div
              style={{
                width: '100%',
                padding: '0.8em 0.4em'
              }}
            >
              <Select
                style={{
                  width: '100%',
                }}
                placeholder="Select a brand"
                onSelect={(e: string) => store.currentBrandId = e}
                value={store.currentBrandId}
              >
                {
                  store.user?.brands?.map((brand) => {
                    return (
                      <Select.Option value={brand.id}>{brand.name}</Select.Option>
                    )
                  })
                }
              </Select>
            </div>
            <Menu.Item
              key="/dashboard"
              disabled={!store.currentBrandId}
            >
              <Link to="/dashboard">
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/brand/info"
              disabled={!store.currentBrandId}
            >
              <Link to={`/brand/info?brand=${store.currentBrandId}`}>
                <Icon type="form" />
                <span>Brand info</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/brand/products"
              disabled={!store.currentBrandId}
            >
              <Link to={`/brand/products?brand=${store.currentBrandId}`}>
                <Icon type="tags" />
                <span>Products</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/brand/orders"
              disabled={!store.currentBrandId}
            >
              <Link to="/brand/orders">
                <Icon type="shopping-cart" />
                <span>Orders</span>
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
            atEnter={translationTransition.atEnter}
            atLeave={translationTransition.atLeave}
            atActive={translationTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
          >
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/brand/info" component={BrandInfoPage} />
            <Route exact path="/brand/products" component={ListProductsPage} />
            <Route exact path="/brand/products/add" component={AddProductPage} />
            <Route exact path="/brand/products/product" component={ProductInfoPage} />
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
            <Route
              path="/admin/users/:userId"
              component={UserInfoPage}
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
