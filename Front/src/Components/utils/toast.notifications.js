// Toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastMessage = (state) => {
    switch (state) {
        case 'success':
            return toast.success('¡Agregado a favoritos!', { position: toast.POSITION.TOP_RIGHT });
        case 'error':
            return toast.error('¡Eliminado de favoritos!', { position: toast.POSITION.TOP_RIGHT });
        case 'deleteUser':
            return toast.error('¡Cuenta de usuario eliminada con éxito!', { position: toast.POSITION.TOP_RIGHT });
    }
};

export default showToastMessage