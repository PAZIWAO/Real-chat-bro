import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		// ตรวจสอบว่ามี selectedConversation และ _id
		if (!selectedConversation || !selectedConversation._id) {
			toast.error("No conversation selected");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});

			// ตรวจสอบสถานะ response
			if (!res.ok) {
				throw new Error("Failed to send message");
			}

			const data = await res.json();

			// ตรวจสอบ error ใน response
			if (data.error) {
				throw new Error(data.error);
			}

			// เพิ่มข้อความใหม่ลงใน state
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
