/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db, storage } from "./firebase-settings";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Chat, Message, User as UserType } from "./types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const CreateAccount = async (
  email: string,
  fullName: string,
  password: string
): Promise<[Error | null, User | null]> => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName: fullName });
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
    });
    return [null, user];
  } catch (error) {
    return [error as Error, null];
  }
};

export const Login = async (
  email: string,
  password: string,
  saveSession: boolean
): Promise<[any | null, User | null]> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (saveSession) {
      localStorage.setItem("userId", user.uid);
    }
    return [null, user];
  } catch (error) {
    return [error as Error, null];
  }
};

export const getUsers = async (
  name: string
): Promise<[Error | null, UserType[] | null]> => {
  try {
    const q = collection(db, "users");
    const docs = query(q, where("fullName", "!=", name));
    const querySnapshot = await getDocs(docs);
    return [
      null,
      querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as UserType)
      ),
    ];
  } catch (error) {
    return [error as Error, null];
  }
};

export const getUser = async (
  user_id: string
): Promise<[Error | null, UserType | null]> => {
  try {
    const docSnap = await getDoc(doc(db, "users", user_id));

    if (docSnap.exists()) {
      return [null, { id: docSnap.id, ...docSnap.data() } as UserType];
    } else {
      return [{ message: "Document does not exist", name: "" }, null];
    }
  } catch (error) {
    return [error as Error, null];
  }
};

export const getChat = async (
  chat_id: string
): Promise<[Error | null, Chat | null]> => {
  try {
    const docSnap = await getDoc(doc(db, "chats", chat_id));
    if (docSnap.exists()) {
      return [null, { id: docSnap.id, ...docSnap.data() } as Chat];
    } else {
      return [{ message: "Document does not exist", name: "" }, null];
    }
  } catch (error) {
    return [error as Error, null];
  }
};

export const getChatWithUsers = async (
  user: Partial<UserType>,
  user_2: Partial<UserType>
): Promise<[Error | null, Chat | null]> => {
  try {
    const q = query(
      collection(db, "chats"),
      where("users", "array-contains", user.id)
    );
    const docs = await getDocs(q);

    if (docs.docs) {
      const _docs = docs.docs
        .map((doc) => {
          const data = { ...doc.data(), id: doc.id } as Chat;
          if (data.users.find((u) => u === user_2.id)) {
            return data.users.includes(user_2.id!) ? data : null;
          }
        })
        .filter((doc) => doc && doc);


      if (_docs[0]) {
        return [null, _docs[0]];
      } else {
        return [null, null];
      }
    } else return [null, null];
  } catch (error) {
    return [error as Error, null];
  }
};

export const sendMessage = async (
  message: Partial<Message>,
  chat_id?: string
) => {
  try {
    if (chat_id) {
      const chatSnapshot = await getDoc(doc(db, "chats", chat_id));
      const chat = chatSnapshot.data() as Chat;
      chat.messages.push(message as Message);
      await updateDoc(doc(db, "chats", chat_id), chat);
      return [null, chat_id];
    } else {
      const doc = await addDoc(collection(db, "chats"), {
        messages: [{ ...message }],
        users: [message.encoder?.id, message.decoder?.id],
      });
      return [null, doc.id];
    }
  } catch (error) {
    return [error as Error, null];
  }
};

export const getUserChats = async (
  user_id: string
): Promise<[Error | null, Chat[] | null]> => {
  try {
    const q = query(
      collection(db, "chats"),
      where("users", "array-contains", user_id)
    );

    const docSnap = await getDocs(q);
    return [
      null,
      docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Chat)),
    ];
  } catch (error) {
    return [error as Error, null];
  }
};

export const uploadAsset = async (
  file: any,
  isVideo?: boolean
) => {
  let extension = "mp4";
  let blob: any = {};

  const metadata = {
    contentType: "image/jpeg",
  };

  if (isVideo) {
    metadata["contentType"] = "video/mp4";
  } else {
    extension = file.files
      ? file.files![0].name.split(".")[1]
      : file.name.split(".")[1];
    blob = file as unknown as Blob;
  }

  const key = Math.floor(Math.random() * 100000).toString();
  const name = `${key}.${extension}`;
  localStorage.setItem("name", name);

  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, `${name}`);

  await uploadBytes(
    imagesRef,
    // ts-ignore
    file.files ? file.files![0] : file[0].name ? file[0] : blob,
    metadata
  );

  const imageUrl = await getDownloadURL(imagesRef);

  return imageUrl;
};
