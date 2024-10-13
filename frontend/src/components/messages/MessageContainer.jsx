import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from "react-icons/ti";
import useConversation from '../../zustand/useConversation'
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
   const { selectedConversation, setSelectedConversation } = useConversation();

   useEffect(() => {

    return () => setSelectedConversation(null)
   },[setSelectedConversation]);
  
  return (
    <div className='flex-1 h-full flex-col flex '>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/*Header*/}
          <div className="bg-slate-600 px-4 py-2 mb-2">
            <span className="label-text">To</span>
            {""}
            <span className="text-gray-950 font-bold">{selectedConversation.fullName}</span>
          </div>
          <div className="flex-1 overflow-auto"> <Messages /></div>
          
          <div className="border-t border-gray-700"> <MessageInput /></div>
          
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const {authUser} = useAuthContext()
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-50 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className = 'text-3xl md:text-6x1 text-center' />
      </div>
    </div>
  );
};
