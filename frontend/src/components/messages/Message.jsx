import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end justify-end" : "chat-start justify-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-600' : "bg-gray-300";
  const textColor = fromMe ? 'text-white' : 'text-black';
  const shakeCLass = message.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName} flex items-start `}>
      {!fromMe && (
        <div className="chat-image avatar mr-2">
          <div className="w-10 rounded-full">
            <img alt="Tailwind Css chat bubble component" src={profilePic} />
          </div>
        </div>
      )}
      <div>
        <div className={`chat-bubble ${textColor} ${bubbleBgColor} ${shakeCLass} px-4 py-2 rounded-lg`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
      {fromMe && (
        <div className="chat-image avatar ml-2">
          <div className="w-10 rounded-full">
            <img alt="Tailwind Css chat bubble component" src={profilePic} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;

