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
            <div className="fixed inset-[4%] sm:inset-20 rounded-lg bg-gray-100 border flex flex-col justify-between pb-4 items-center">
                <div className="h-[90%] w-full overflow-y-auto">{children}</div>
                <div className='flex w-full justify-center items-end'>
                    {actionBar}
                </div>               
            </div>
        </div>,

        document.querySelector('.modal-container')
    );
}

export default Modal