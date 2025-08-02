import { useRef } from "react"
import axios from "axios"
import { Button } from "../components/Button"
import { InputField } from "../components/InputField"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Config";
interface SignUpResponse {
  msg: string;
}

export const SignUp = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passWordRef = useRef<HTMLInputElement>(null);
  const navigate=useNavigate();

  const handleSignUp = async () => {
    const username = userNameRef.current?.value;
    const password = passWordRef.current?.value;
    
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
    
    try {
      const response = await axios.post<SignUpResponse>(`${BACKEND_URL}/signup`, {
        username,
        password
      });
 
      navigate("/signin");
      console.log(response.data);

    } 
    catch (error:any) {
      console.error('Signup failed:', error);
      const errorMsg = error.response?.data?.msg || error.message;
      alert('Signup failed: ' + errorMsg);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center p-4">
      <div className="bg-white rounded-md border w-full max-w-md p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Create your Brainely account</p>
        </div>
        
        <InputField ref={userNameRef} placeholder="Username" />
        <InputField ref={passWordRef} type="password" placeholder="Password" />
        
        <div className="flex justify-center pt-4">
          <Button              
            variant="primary" 
            text="Sign Up" 
            fullWidth={true}
            onClick={handleSignUp}
          />
        </div>
        
        <div className="text-center mt-4 space-y-2">
          <p className="text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Sign in here
            </button>
          </p>
          <p className="text-sm text-gray-500">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              ← Back to Home
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

