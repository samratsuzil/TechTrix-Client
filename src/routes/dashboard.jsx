import Dashboard from "views/Dashboard/Dashboard.jsx";
import Notifications from "views/Notifications/Notifications.jsx";
import Icons from "views/Icons/Icons.jsx";
import Typography from "views/Typography/Typography.jsx";
import TableList from "views/TableList/TableList.jsx";
import Maps from "views/Maps/Maps.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import Transactions from "views/Transactions/Transactions";
import Logout from "components/Logout/Logout";
var dashRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: Dashboard
  // },
  {
    path: "/transactions",
    name: "Transactions",
    icon: "nc-icon nc-bullet-list-67",
    component : Transactions
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage
  },
{
  path: "/logout",
  name: "Logout",
  icon: "nc-icon nc-key-25",
  component: Logout
},
  { redirect: true, path: "/", pathTo: "/transactions", name: "Transactions" }
];
export default dashRoutes;
