import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/Assets/css/custom.css";
import "font-awesome/css/font-awesome.min.css";
import "../src/Assets/css/new.css";
// import SignUp from "./component/SignUp";
// import Mnemonic from "./component/Mnemonic/Mnemonic"
// import VerifyMnemonic from "./component/Mnemonic/verifyMnemonic"
import SignIn from "./component/SignIn";
// import ForgetPassword from "./component/ForgetPassword";
// import VerificationCode from "./component/VerificationCode";
import OverView from "./component/OverView";
import SharedLayout from "./component/shared/SharedLayout";
// import Wallets from "./component/Wallets";
// import WalaGate from "./component/WalaGate";
// import Setting from "./component/Setting";
// import RecentInvoices from "./component/RecentInvoices";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Loader from "./component/shared/loader";
import ProjectManagement from "./component/ProjectManagement";
// import KYC from "./component/KYC";
// import Invoice from "./component/Invoice";
// import PayWalaScreen from "./component/PayWalaScreen";
// import RecentTransaction from "./component/RecentTransaction";
// import TwoFactor from "./component/TwoFactorAuthentication";
// import TwoFaLogin from "./component/2FALoginCode";
// import Reset2FA from "./component/Reset2FA";
// import EditProfile from "./component/EditProfile";
// import ChangePassword from "./component/ChangePassword";
// import BasicExchangePlaceholder from "./component/BasicExchangePlaceholder";
// import ProExchangePlaceholder from "./component/ProExchangePlaceholder";
// import MarketPlace from "./component/MarketPlace";
// import subCategory from "./component/subCategory";
// import Asset from "./component/Asset";
// import Transfer from "./component/transfer";
const Pages = () => {
  return (
    <Loader
      style={{
        flex: 1,
      }}
    >
      <BrowserRouter basename={"/"}>
        <div>
          <Switch>
            <PublicRoute exact path="/" component={SignIn} />{" "}
            <PublicRoute exact path="/SignIn" component={SignIn} />{" "}
            {/* <PublicRoute exact path="/SignUp" component={SignUp} />{" "} */}
            
            <Fragment>
              <SharedLayout>
                <PrivateRoute
                  exact
                  path="/ProjectManagement"
                  component={ProjectManagement}
                ></PrivateRoute>{" "}
              </SharedLayout>{" "}
            </Fragment>{" "}
          </Switch>{" "}
        </div>{" "}
      </BrowserRouter>{" "}
    </Loader>
  );
};
ReactDOM.render(
  <Provider store={store}>
    <Pages />
  </Provider>,
  document.getElementById("root")
);
