import { FunctionComponent, useEffect, useState } from "react";
import { LoadingPage } from "../loading/LoadingPage";
import { getGuest } from "../../firebase/firebase";
import { useCurrentUser } from "../../hooks/context/UserProvider";
import { GuestInfo } from "./GuestInfo";
import { DEFAULT_GUEST_STATE, Guests } from "./guests";

export const GuestContainer: FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState(DEFAULT_GUEST_STATE);
  const currentUser = useCurrentUser();
  const debugLocal = false;

  useEffect(() => {
    (async () => {
      setLoading(true);
      let response = DEFAULT_GUEST_STATE;
      if (debugLocal) {
        response = Guests[0];
      } else {
        response = await getGuest(currentUser.user?.uid ?? "none");
      }
      if (response.name !== "NONE") {
        setGuest(response);
        setLoading(false);
      }
    })();
  }, [currentUser, debugLocal]);
  return loading ? <LoadingPage /> : <GuestInfo guest={guest} />;
};
