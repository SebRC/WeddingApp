import { FunctionComponent } from "react";
import styles from "./Navbar.module.css";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { IconLogout } from "../icons/IconLogout";
import { useCurrentUser } from "../../hooks/context/UserProvider";
import { handleSignOut } from "../../firebase/firebase";
import { PageLayout } from "../layout/pageLayout/PageLayout";
import { AdminRoute, AuthRoute, GiftsRoute, GuestRoute, InfoRoute, SettingsRoute } from "../../routing/routes";
import { Roles } from "../authentication/Roles";
import { useTranslator } from "../../translations/useTranslator";
import { IconSettings } from "../icons/IconSettings";

export const Navbar: FunctionComponent = () => {
  const location = useLocation();
  const user = useCurrentUser();
  const navigate = useNavigate();
  const translator = useTranslator();

  const handleLogout = async () => {
    await handleSignOut();
    navigate(AuthRoute.path);
  };

  return (
    <>
      <div className={styles.navbar}>
        {user.authed && (
          <>
            <Link
              to={GuestRoute.path}
              className={location.pathname.includes(GuestRoute.path) ? `${styles.active}` : ""}
            >
              {translator.guest()}
            </Link>
            <Link to={InfoRoute.path} className={location.pathname.includes(InfoRoute.path) ? `${styles.active}` : ""}>
              {translator.info()}
            </Link>
            <Link
              to={GiftsRoute.path}
              className={location.pathname.includes(GiftsRoute.path) ? `${styles.active}` : ""}
            >
              {translator.gifts()}
            </Link>
            {user?.role === Roles.Admin && (
              <Link
                to={AdminRoute.path}
                className={location.pathname.includes(AdminRoute.path) ? `${styles.active}` : ""}
              >
                {translator.admin()}
              </Link>
            )}
          </>
        )}
        <Link to={AuthRoute.path} style={{ float: "right" }} onClick={handleLogout}>
          <IconLogout />
        </Link>
        <Link
          to={SettingsRoute.path}
          style={{ float: "right" }}
          className={location.pathname.includes(SettingsRoute.path) ? `${styles.active}` : ""}
        >
          <IconSettings />
        </Link>
      </div>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  );
};
