import { useContextGlobal } from "./../utils/global.context";
import showToastMessage from "./../utils/toast.notifications";

const FavButton = ({ tour }) => {
  const { toursState, dispatch } = useContextGlobal();

  const isFavorite = toursState.favs.some((item) => item.id === tour.id); 

  const addFav = () => {
    let favs = toursState.favs || []; 

    const alreadyExists = favs.some((item) => item.id === tour.id);

    if (!alreadyExists) {
      dispatch({ type: "ADD_FAVS", payload: tour });
      showToastMessage("success");
    } else {
      dispatch({ type: "REMOVE_FAVS", payload: tour });
      showToastMessage("error");
    }
  };

  const buttonClass = isFavorite ? "fav-btn active" : "fav-btn";

  return (
    <div className={buttonClass} onClick={addFav}>
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

export default FavButton;
