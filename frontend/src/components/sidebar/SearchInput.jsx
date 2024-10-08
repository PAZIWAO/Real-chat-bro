import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";


const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder='Search' className='input input-bordered rounded-full' />
        <button type='submit' className='btn btn-circle bg-gray-600 text-white'>
            <IoSearchOutline className='w-6 h-6 outline-none' />
        </button>

    </form>
  )
};

export default SearchInput;
