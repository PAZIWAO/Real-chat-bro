import { useState } from "react";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from '../../hooks/useGetConversations'
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState();
  const {setSelectedConversation} = useConversation()
  const { conversations } = useGetConversations()
  
  
  const handleSubnit = (e) =>{
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
    return  toast.error('กรอกชื่อผู้ใช้งานอย่างน้อย 3 ตัวอักษร')
    }

    const conversation = conversations.find ((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

    if(conversation) {
      setSelectedConversation(conversation)
      setSearch("");
    } else toast.error("ไม่พบผู้ใช้งาน")
  }
  return (
    <form onSubmit={handleSubnit} className='flex items-center gap-2'>
        <input type="text" placeholder='Search' className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-gray-600 text-white'>
            <IoSearchOutline className='w-6 h-6 outline-none' />
        </button>

    </form>
  )
};

export default SearchInput;
