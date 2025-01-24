import { ReactNode } from "react";

const ModalContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md backdrop-brightness-50">
            {children}
        </div>
    );
};

export default ModalContainer;
