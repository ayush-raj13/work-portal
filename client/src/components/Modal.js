import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({ onClose, actionBar, children }) {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className="fixed inset-10 sm:inset-20 rounded-lg bg-white border flex flex-col justify-between px-8 py-4 items-center">
                <div>{children}</div>
                <div className='flex w-full justify-center items-end'>
                    {actionBar}
                </div>               
            </div>
        </div>,

        document.querySelector('.modal-container')
    );
}

export default Modal