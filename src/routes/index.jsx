import Home from "../page/custom/Home";
import Cart from "../page/custom/cart";
import Jobs from "../page/admin/jobs";
import Message from "../page/admin/message";
import SampleUpdate from "../page/admin/sampleUpdate";
import Warehouse from "../page/admin/warehouse";
import Login from "../page/custom/login";
import ResetPassword from "../page/custom/resetPwd";
import OTPCode from "../page/custom/otpCode";
import NewPassword from "../page/custom/NewPassword";
import Edit from "../page/custom/edit";
import SampleProduct from "../page/custom/sample";
import UpdateAccount from "../page/admin/edit";
import Accounts from "../page/admin/accounts";
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
    component: Accounts,
    layout: "admin",
  },
  {
    path: "/update",
    component: UpdateAccount,
    layout: "admin",
  },
  {
    path: "/message",
    component: Message,
    layout: "admin",
  },
  {
    path: "/sampleUpdate",
    component: SampleUpdate,
    layout: "admin",
  },
  {
    path: "/warehouse",
    component: Warehouse,
    layout: "admin",
  },
  {
    path: "/login",
    component: Login,
    layout: "login",
  },
  {
    path: "/resetPassword",
    component: ResetPassword,
    layout: "login",
  },
  {
    path: "/resetPassword/otpCode",
    component: OTPCode,
    layout: "login",
  },
  {
    path: "/resetPassword/otpCode/newPassword",
    component: NewPassword,
    layout: "login",
  },
  {
    path: "/updateUser",
    component: Edit,
  },
  {
    path: "/sample",
    component: SampleProduct,
  }
];

export { publicRoute };
