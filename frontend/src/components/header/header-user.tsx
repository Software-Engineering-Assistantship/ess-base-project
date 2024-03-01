import { appUserRoutes } from "../app-layout";
import { Header } from "../header";

export function HeaderUser() {
  return (
    <Header routes={appUserRoutes} />
  )
}