import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";

export interface Plante {
  id: number;
  name: string;
  unitprice_ati: number;
  quantity: number;
  category: string;
  rating: number;
  url_picture: string;
}

/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */
let listePlantes: Plante[] = [];
let checkedCateg: string[] = [];

const Home = () => {
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plante[]>([
    ...listePlantes,
  ]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/plantes").then((Response) => {
      listePlantes = Response.data.data;
      setListPlantDisplayed(listePlantes);
      console.log(listePlantes);
    });
  }, []);

  const handleCheckCategories = (mesCategoriesChecked: string[]) => {
    console.log("categories checked", mesCategoriesChecked);
    /**
     * Filtrer nos données ici
     */
    let resultFilteredPlants;
    checkedCateg = [...mesCategoriesChecked];

    if (checkedCateg.length > 0) {
      resultFilteredPlants = listePlantes.filter((x) =>
        checkedCateg.includes(x.category)
      );
    } else {
      resultFilteredPlants = [...listePlantes];
    }

    setListPlantDisplayed(resultFilteredPlants); // mettre à jour l'affichage de notre composant en fonction de la valeur de result
  };

  return (
    <div className="d-flex align-items-stretch">
      <SideBar
        listElementPlant={listePlantes}
        onChangeCategoriesCheck={handleCheckCategories}
      />
      <div
        className="container-fluid custom-main"
        style={{ display: "flex", flexWrap: "wrap", marginRight: "20px" }}
      >
        <ul>
          {listPlantDisplayed.map((plante, i) => (
            <li key={i} style={{ listStyleType: "none" }}>
              <div className="card" style={{ width: "18rem" }} />
              <img
                src={`http://localhost:8080/assets/${plante.url_picture}`}
                className="card-img-top"
                alt="photos"
                style={{ width: "10rem" }}
              />
              <div className="card-body">
                <h5 className="card-title">{plante.name}</h5>
                <p className="card-text">
                  {plante.category}- 💵 {plante.unitprice_ati}€ ⭐
                  {plante.rating}
                </p>
                <div className="btn btn-success">Acheter</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
