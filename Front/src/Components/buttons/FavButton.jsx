import { useContextGlobal } from "./../utils/global.context";
import showToastMessage from "../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const FavButton = ({ tour }) => {
  const { toursState, dispatch } = useContextGlobal();
  const navigate = useNavigate();

  const isFavorite = toursState.favs.some((item) => item.id === tour.id); 
  const isLoggedIn = !!localStorage.getItem('userData');

  const addFav = () => {
    let favs = toursState.favs || []; 

    const alreadyExists = favs.some((item) => item.id === tour.id);

    if (!alreadyExists) {
      dispatch({ type: "ADD_FAVS", payload: tour });
      showToastMessage("success", "¡Agregado a favoritos!");
    } else {
      dispatch({ type: "REMOVE_FAVS", payload: tour });
      showToastMessage("error", "¡Eliminado de favoritos!");
    }
  };

  const buttonClass = isLoggedIn ? (isFavorite ? "fav-btn active" : "fav-btn") : "fav-btn";

  const handleButtonClick = () => {
    if (isLoggedIn) {
      addFav();
    } else {
      navigate("/login", { state: { fromFavButton: true } }) ;
    }
  };

  return (
    <div className={buttonClass} onClick={handleButtonClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-heart"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
      </svg>
    </div>
  );
};

FavButton.propTypes = {
  tour: PropTypes.object.isRequired
};

export default FavButton;