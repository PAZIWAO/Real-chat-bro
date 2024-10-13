import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className='flex h-screen w-full rounded-lg overflow-hidden bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
