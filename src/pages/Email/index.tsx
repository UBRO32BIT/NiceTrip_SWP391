import { Route, Routes } from "react-router-dom";
import VerifyEmail from "../../components/Email/VerifyEmail";

export default function Email() {
    return (
        <>
            <Routes>
                <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
        </>
    );
}