import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateReservation from "./app/reservation/pages/CreateReservation";
import MyReservations from "./app/reservation/pages/MyReservations";
import SelectReservation from "./app/reservation/pages/SelectReservation";
import EditReservation from "./app/reservation/pages/EditReservation";
import SeeReservation from "./app/reservation/pages/SeeReservation";
import { Promotion } from "./app/Promotion/pages";
import { PublishedReservation } from "./app/PublishedReservation/pages/Register";
import { AllPublishedReservation } from "./app/PublishedReservation/pages/Reservations";
import { ReservationDetails } from "./app/PublishedReservation/pages/ReservationDetails";
import { HomePage } from "./app/home/pages/homepage";
import { Profile } from "./app/Profile";
import  { Rate }  from "./app/Rate/pages/myRates";
import { Rating } from "./app/Rate/pages/rating";
import { Whishlist } from "./app/Wishlist/pages/myWhishlist";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import RecoverPasswordHotelier from "./app/auth/pages/hotelier/recover";
import RecoverPasswordClient from "./app/auth/pages/client/recover";
import ResetPasswordClient from "./app/auth/pages/client/reset";
import ResetPasswordHotelier from "./app/auth/pages/hotelier/reset";
import RegisterClient from "./app/auth/pages/client/register";
import EditProfileClient from "./app/auth/pages/client/profile";
import RegisterHotelier from "./app/auth/pages/hotelier/register";
import { PublishedReservationUpdate } from "./app/PublishedReservation/pages/Update";
import { AllPublishedReservationClient } from "./app/PublishedReservation/pages/ReservationsClients";
import { SearchPage } from "./app/search/pages/search";
import  Cartoes  from "./app/PaymentMethods/pages/MyCards";
import EditProfileHotelier from "./app/auth/pages/hotelier/profile";
import { AuthWrapper } from "./shared/components/auth-wrapper";
import NotFoundPage from "./app/home/pages/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/client/login",
    Component: LoginClient,
  },
  {
    path: "/client/password/recover",
    Component: RecoverPasswordClient,
  },
  {
    path: "/client/password/reset",
    Component: ResetPasswordClient,
  },
  {
    path: "/client/register",
    Component: RegisterClient,
  },
  {
    path: "/client/profile",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <Profile />
      </AuthWrapper>
    ),
  },
  {
    path: "/client/profile/edit",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <EditProfileClient />
      </AuthWrapper>
    ),
  },
  {
    path: "/client/profile/rate",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <Rate />
      </AuthWrapper>
    ),
  },
  {
    path: "/client/profile/whishlist",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <Whishlist />
      </AuthWrapper>
    ),
  },
  {
    path: "/hotelier/login",
    Component: LoginHotelier,
  },
  {
    path: "/hotelier/password/recover",
    Component: RecoverPasswordHotelier,
  },
  {
    path: "/hotelier/password/reset",
    Component: ResetPasswordHotelier,
  },
  {
    path: "/hotelier/register",
    Component: RegisterHotelier,
  },
  {
    path: "/hotelier/profile",
    element: (
      <AuthWrapper allowedUserTypes={["hotelier"]}>
        <EditProfileHotelier />
      </AuthWrapper>
    ),
  },
  {
    path: "/create-reservation",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <CreateReservation />
      </AuthWrapper>
    ),
  },
  {
    path: "/my-reservations",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <MyReservations />
      </AuthWrapper>
    ),
  },
  {
    path: "/select-reservation",
    Component: SelectReservation,
  },
  {
    path: "/edit-reservation/:reserve_id",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <EditReservation />
      </AuthWrapper>
    ),
  },
  {
    path: "/see-reservation/:reserve_id",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <SeeReservation />
      </AuthWrapper>
    ),
  },
  {
    path: "/search",
    Component: SearchPage,
  },
  {
    path: "/promotions",
    element: (
      <AuthWrapper allowedUserTypes={["hotelier"]}>
        <Promotion />
      </AuthWrapper>
    ),
  },
  {
    path: "/publishedReservation",
    element: (
      <AuthWrapper allowedUserTypes={["hotelier"]}>
        <PublishedReservation />
      </AuthWrapper>
    ),
  },
  {
    path: "/hotelier-reservations",
    element: (
      <AuthWrapper allowedUserTypes={["hotelier"]}>
        <AllPublishedReservation />
      </AuthWrapper>
    ),
  },
  {
    path: "/reservationDetails",
    element: (
      <AuthWrapper allowedUserTypes={["hotelier"]}>
        <ReservationDetails />
      </AuthWrapper>
    ),
  },
  {
    path: "/reservationUpdate",
    element: (
      <AuthWrapper allowedUserTypes={["hotelier"]}>
        <PublishedReservationUpdate />
      </AuthWrapper>
    ),
  },
  {
    path: "/reservations",
    Component: AllPublishedReservationClient,
  },
  {
    path: "/client/profile/rate/rating/:reservationId",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <Rating />
      </AuthWrapper>
    ),
  },

  {
    path : '/client/paymentMethods',
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <Cartoes/>
      </AuthWrapper>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
