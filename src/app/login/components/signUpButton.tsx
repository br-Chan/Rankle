import { useState } from "react";
import { createPortal } from "react-dom";
import SignUpModal from "@/features/firebaseAuth/components/signUpModal";

const SignUpButton = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                First time?{" "}
                <button
                    onClick={() => setShowModal(true)}
                    className="font-semibold text-amber-500 hover:underline"
                >
                    Create an account
                </button>
            </div>
            {showModal &&
                createPortal(<SignUpModal onCancel={() => setShowModal(false)} />, document.body)}
        </>
    );
};

export default SignUpButton;
