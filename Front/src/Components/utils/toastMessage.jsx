import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastMessage = (state, message) => {
    switch (state) {
        case 'success':
            return toast.success(message, { position: toast.POSITION.TOP_RIGHT });
        case 'error':
            return toast.error(message, { position: toast.POSITION.TOP_RIGHT });
        default:
            return toast.error("No se pudo obtener el mensaje", { position: toast.POSITION.TOP_RIGHT });
    }
};

export default showToastMessage;