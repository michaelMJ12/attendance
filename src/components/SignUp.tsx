import React, { useState } from "react";
import '../styles/signUp.css'
import logo from '../assets/logoU.jpg'
import type { UserRole } from "../models/UserModel";
import { USER_ROLES } from "../models/RoleModel";


const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [role, setRole] = useState<UserRole>("Student");






    return (
        <>
            <div className="container1">
                <form action="" className="form-container1">
                    <div className="form-logo">
                        <img src={logo} alt="" />
                    </div>
                    <input
                        type="text"
                        placeholder="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required

                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required

                    />
                    <input
                        type="password"
                        placeholder="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required

                    />
                    <select
                        className="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                    >
                        {USER_ROLES.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>

                    <button type="submit">SignUp</button>
                </form>
            </div>
        </>

    )



}


export default SignUp