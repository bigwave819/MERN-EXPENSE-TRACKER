import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfileSelectorImage from "../../components/Inputs/ProfileSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""
    
        if (!validateEmail(email)) {
          setError("enter the valid email address")
          return;
        }
        if (!password) {
          setError("please enter the password")
          return;
        }

        if (!fullname) {
          setError("please enter your full names")
          return;
        }
        setError("");
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black ">Create an Accout</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us Today by entering your details below
        </p>
        <form onSubmit={handleSignUp}>
          <ProfileSelectorImage image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input
              value={fullname} // ✅ Fixed 'Value' to 'value'
              onChange={({ target }) => setFullname(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email} // ✅ Fixed 'Value' to 'value'
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@gmail.com"
              type="email"
            />
            <div className="md:col-span-2">
              {" "}
              {/* ✅ Only span 2 columns on md+ screens */}
              <Input
                value={password} // ✅ Fixed 'Value' to 'value'
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
          </div>
          { error && <p className='text-red-500 text-xs pb-2.5'>{error}</p> }
                    <button type='submit' className='btn-primary'>
                      SIGN UP
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                      Already have an account?{" "}
                          <Link className="font-medium text-primary underline" to="/login">
                            Login
                          </Link>
                    </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
