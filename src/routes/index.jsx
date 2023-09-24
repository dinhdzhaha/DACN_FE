import Home from "../page/custom/Home";
import Cart from "../page/custom/cart";
import Jobs from "../page/admin/jobs";
import Account from "../page/admin/account";
import Update from "../page/admin/account/update";
import Message from "../page/admin/message";
import Sampleupdate from "../page/admin/sampleupdate";
import Warehouse from "../page/admin/warehouse";
const publicRoute = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/cart",
    component: Cart,
  },
  //admin
  {
    path: "/admin",
    component: Jobs,
    layout: "admin",
  },
  {
    path: "/account",
    component: Account,
    layout: "admin",
  },
  {
    path: "/update",
    component: Update,
    layout: "admin",
  },
  {
    path: "/message",
    component: Message,
    layout: "admin",
  },
  {
    path: "/sampleupdate",
    component: Sampleupdate,
    layout: "admin",
  },
  {
    path: "/warehouse",
    component: Warehouse,
    layout: "admin",
  },
];

export { publicRoute };
