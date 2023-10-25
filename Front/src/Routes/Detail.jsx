import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContextGlobal } from "../Components/utils/global.context";
import animalImages from "../Components/utils/mock.dentist.images";

const Detail = () => {
  const { dentistsState } = useContextGlobal();

  const [dentist, setDentist] = useState({});
  const params = useParams();

  const url = "https://jsonplaceholder.typicode.com/users/" + params.id;

  const imageUrl =
    animalImages.find((image) => image.id === dentist.id)?.url || ""; // Mock con imágenes para cada card

  useEffect(() => {
    axios(url).then((res) => setDentist(res.data));
  }, []);

  return (
    <main className={`${dentistsState.theme ? "light" : "dark"} py-20 mx-auto md:flex md:items-center md:justify-center w-full min-h-[86vh] overflow-x-auto`}>
      <table className="text-md text-left text-gray-500 dark:text-gray-400 container px-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              #ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Website
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="w-4 p-4">{dentist.id}</td>
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={imageUrl}
                alt={"Photo of " + dentist.name}
              />
              <div className="pl-3">{dentist.name}</div>
            </th>
            <td className="px-6 py-4">{dentist.email}</td>
            <td className="px-6 py-4">{dentist.phone}</td>
            <td className="px-6 py-4">{dentist.website}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default Detail;
