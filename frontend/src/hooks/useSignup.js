import toast from "react-hot-toast";
import { useState } from 'react'
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
        const [ loading,setLoading] = useState(false);
        const {authUser,setAuthUser} = useAuthContext();   

        const signup = async({ fullName , username , password , confirmPassword, gender}) => {
            const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
            if(!success) return;

            setLoading(true);
            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({ fullName, username, password, confirmPassword, gender})
                });

            const data =await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            
            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data);
            } catch (error) {
            toast.error(error.message);
            }finally {
            setLoading(false);
            }
        };

        return { loading , signup};

    };

export default useSignup;


function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender ) {
        toast.error("กรุณากรอกข้อมูลให้ครบ")
        return false;
    }

    if(password !== confirmPassword){   
        toast.error("รหัสผ่านไม่ตรงกัน")
        return false;
    }

    if(password.length <6 ){
        toast.error("รหัสผ่านมีความยาวอย่างน้อย 6 ตัว")
        return false;
    }

    return true;
}
