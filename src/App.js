
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import ProductsDashboard from "./screens/ProductsDashboard";
import NewProduct from "./screens/NewProduct";
import Drafts from "./screens/Drafts";
import Released from "./screens/Released";
import Comments from "./screens/Comments";
import Scheduled from "./screens/Scheduled";
import Customers from "./screens/Customers";
import CustomerList from "./screens/CustomerList";
import Promote from "./screens/Promote";
import Notification from "./screens/Notification";
import Settings from "./screens/Settings";
import UpgradeToPro from "./screens/UpgradeToPro";
import MessageCenter from "./screens/MessageCenter";
import ExploreCreators from "./screens/ExploreCreators";
import AffiliateCenter from "./screens/AffiliateCenter";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Earning from "./screens/Earning";
import Refunds from "./screens/Refunds";
import Payouts from "./screens/Payouts";
import Statements from "./screens/Statements";
import Shop from "./screens/Shop";
import PageList from "./screens/PageList";
import NewCustomer from "./screens/NewCustomer";
import NewReservation from "./screens/NewReservation";
import ProfileUser from "./screens/ProfileUser";
import ForgotPassword from "./screens/ForgotPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Page title="Hi, Jaden hole"><Home /></Page>} />
      <Route path="/products/dashboard" element={<Page title="Products dashboard"><ProductsDashboard /></Page>} />
      <Route path="/products/add" element={<Page title="New product"><NewProduct product={true}/></Page>} />
      <Route path="/products/edit" element={<Page title="Edit product"><NewProduct product={true} editProd={true}/></Page>} />
      <Route path="/products/drafts" element={<Page title="Drafts"><Drafts /></Page>} />
      <Route path="/products/released" element={<Page title="Packages"><Released /></Page>} />
      <Route path="/packages/add" element={<Page title="New package"><NewProduct /></Page>} />
      <Route path="/packages/edit" element={<Page title="Edit package"><NewProduct  editPack={true}/></Page>} />
      <Route path="/packages/comments" element={<Page title="Comments"><Comments /></Page>} />
      <Route path="/customers/overview" element={<Page title="Customers"><Customers /></Page>} />
      <Route path="/customers/add" element={<Page title="New customer"><NewCustomer/></Page>} />
      <Route path="/customers/edit" element={<Page title="Edit customer"><NewCustomer editCust={true}/></Page>} />
      <Route path="/customers/customer-list" element={<Page title="Customers"><CustomerList /></Page>} />
      <Route path="/shop" element={<Page wide><Shop /></Page>} />
      <Route path="/profile" element={<Page wide><ProfileUser /></Page>} />
      <Route path="/profile:id" element={<Page wide><ProfileUser /></Page>} />
      <Route path="/reservations/reservationList" element={<Page title="Reservations"><Earning resertList={true} /></Page>} />
      <Route path="/reservations/add" element={<Page title="New reservation"><NewReservation  /></Page>} />
      <Route path="/reservations/agenda" element={<Page title="Agenda"><Scheduled /></Page>} />
      <Route path="/income/earning" element={<Page title="Income"><Earning /></Page>} />
      <Route path="/income/incomeList" element={<Page title="Income"><Refunds /></Page>} />
      <Route path="/income/payouts" element={<Page title="Payouts"><Payouts /></Page>} />
      <Route path="/income/statements" element={<Page title="Statements"><Statements /></Page>} />
      <Route path="/promote" element={<Page title="Promote"><Promote /></Page>} />
      <Route path="/notification" element={<Page title="Notifications"><Notification /></Page>} />
      <Route path="/settings" element={<Page title="Settings"><Settings /></Page>} />
      <Route path="/upgrade-to-pro" element={<Page title="Upgrade to Pro"><UpgradeToPro /></Page>} />
      <Route path="/message-center" element={<Page title="Message center"><MessageCenter /></Page>} />
      <Route path="/explore-creators" element={<Page title="Explore creators"><ExploreCreators /></Page>} />
      <Route path="/affiliate-center" element={<Page title="Affiliate center"><AffiliateCenter /></Page>} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pagelist" element={<PageList />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;