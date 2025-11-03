import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyResetTokenAPI, resetPasswordAPI } from "../../api/api";
import { errorNotification, successNotification } from "../../helpers/notifi_helper";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        const verify = async () => {
            const res = await verifyResetTokenAPI(token);
            if (res?.success) setIsValid(true);
            else {
                errorNotification("Invalid or expired reset link");
                navigate("/forgot-password");
            }
        };
        verify();
    }, [token, navigate]);

    const handleReset = async (e) => {
        e.preventDefault();
        const res = await resetPasswordAPI({ token, newPassword: password });
        if (res?.success) {
            successNotification("Password reset successfully!");
            navigate("/");
        } else {
            errorNotification(res?.message || "Failed to reset password");
        }
    };

    if (!isValid)
        return (
            <div className="flex h-screen items-center justify-center text-gray-400">
                Verifying reset link...
            </div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center text-gray-100 bg-black">
            <form onSubmit={handleReset} className="bg-zinc-900 p-6 rounded-lg">
                <h1 className="text-xl font-semibold text-red-500 mb-4">Reset Password</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full p-2 rounded bg-zinc-800 text-gray-100 mb-4"
                />
                <button className="w-full bg-red-600 py-2 rounded">Reset</button>
            </form>
        </div>
    );
};
export default ResetPassword;
