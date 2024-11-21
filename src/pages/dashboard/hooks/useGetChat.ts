import { Dispatch, SetStateAction, useEffect } from "react";
import { auth } from "../../../firebase-settings";
import { getChatWithUsers } from "../../../helper";
import { SCREENS } from "../../../navigation/constants";
import { useNavigate } from "react-router-dom";
import { Chat, User as UserType } from "../../../types";

export default function useGetChat({
  notify,
  chatUser,
  setChat,
}: {
  notify: () => void;
  chatUser: UserType;
  setChat: Dispatch<SetStateAction<Chat|null>>;
}) {
  const navigate = useNavigate();
  useEffect(() => {
    const run_setup = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) navigate(SCREENS.LOGIN, { replace: true });
      else {
        const [error, chat] = await getChatWithUsers(
          { id: currentUser?.uid },
          { id: chatUser.id }
        );

        if (error) {
          notify();
          console.log("useGetChatUser", error);
        }

        if (!chat && !error) {
          setChat(null)
        }

        if (chat) {
          setChat(chat);
        }
      }
    };

    run_setup();
  }, [chatUser?.id]);
}
