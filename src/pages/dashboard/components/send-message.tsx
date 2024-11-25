import { FormEvent, useContext, useRef } from "react";
import { DashBoardContex } from "..";
import { auth } from "../../../firebase-settings";
import { getChat, sendMessage, uploadAsset } from "../../../helper";
import { Message } from "../../../types";

const SendMessage = () => {
  const { selectedChat, chatUser, updateSelectedChat, chats, setChats } =
    useContext(DashBoardContex);

  
  const formRef = useRef<HTMLFormElement | null>(null);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const {
      message: { value: message },
      file
    } = formRef.current!;

    if (!message) return;
    const assetURL = await uploadAsset(file, false)
    const _message: Partial<Message> = {
      createdAt: new Date().getTime(),
      decoder: chatUser!,
      encoder: {
        id: auth.currentUser!.uid!,
        fullName: auth.currentUser!.displayName!,
      },
      textContent: message,
      event: "MESSAGE_CREATED",
      status: "CREATED",
      assetURL: [assetURL]
    };
    const [error, message_id] = await sendMessage(_message, selectedChat?.id);
    if (error) {
      console.log("message error", error);
    } else if (message_id) {
      formRef.current!["message"]["value"] = "";

      const [, _chat] = await getChat(message_id as string);
      if (_chat) {
        updateSelectedChat!(_chat);
        if (!selectedChat?.id) {
          setChats!([_chat, ...(chats ?? [])])
        }
      }

    }
  };

  const openFile = () => {
    formRef.current!.file.click();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="z-50 bg-white fixed flex h-12 w-9/12 shrink-0 items-center justify-between border-t border-slate-150 bottom-0 px-[calc(var(--margin-x)-.25rem)] transition-[padding,width] duration-[.25s] dark:border-navy-600 dark:bg-navy-800"
    >
      <div className="-ml-1.5 flex flex-1 space-x-2">
        <input type="file" accept="image/*" multiple={false} className="hidden" name="file" />
        {/* ATTACHMENT BUTTON */}
        <button
          type="button"
          onClick={openFile}
          className="h-9 w-9 shrink-0 rounded-full flex justify-center items-center text-slate-500 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:text-navy-200 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </button>

        {/* MESSAGE INPUT */}
        <input
          type="text"
          className="form-input focus:outline-none h-9 w-full bg-transparent placeholder:text-slate-400/70"
          placeholder="Write the message"
          name="message"
        />
      </div>

      <div className="-mr-1.5 flex">
        {/* EMOJI BUTTON */}
        <button
          type="button"
          className="items-center justify-between flex h-9 w-9 shrink-0 rounded-full p-0 text-slate-500 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:text-navy-200 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>

        {/* SEND BUTTON */}
        <button className="items-center justify-between flex h-9 w-9 shrink-0 rounded-full p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.813 5.146 9.027 3.99c4.05 1.79 4.05 4.718 0 6.508l-9.027 3.99c-6.074 2.686-8.553.485-5.515-4.876l.917-1.613c.232-.41.232-1.09 0-1.5l-.917-1.623C1.26 4.66 3.749 2.46 9.813 5.146ZM6.094 12.389h7.341"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
