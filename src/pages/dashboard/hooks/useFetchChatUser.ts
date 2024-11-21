import { auth } from "../../../firebase-settings";
import { SCREENS } from "../../../navigation/constants";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { getUser } from "../../../helper";
import { User } from "../../../types";

export default function useFetchChatUser({
  selectedUserId,
  notify,
  setChatUser,
}: {
  selectedUserId: string;
  setChatUser: Dispatch<SetStateAction<User | null>>;
  notify: () => void;
}) {
  const navigate = useNavigate();
  useEffect(() => {
    const run_setup = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) navigate(SCREENS.LOGIN, { replace: true });

      if (selectedUserId) {
        const [error, user] = await getUser(selectedUserId);

        if (error) {
          notify();
          console.log("useFetchChatUserError", error);
        }

        if (user) {
          setChatUser(user);
        }
      }
    };

    run_setup();
  }, [selectedUserId]);
}
