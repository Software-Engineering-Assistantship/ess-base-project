import { appAdminRoutes } from "../app-layout";
import { Header } from "../header";

export function HeaderAdmin() {
  return (
    <Header routes={appAdminRoutes} />
  )
}