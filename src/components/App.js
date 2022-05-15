import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleClick(){

    const queryParam = filters.type

    if (queryParam === "all"){
      fetch("http://localhost:3001/pets")
      .then(res=>res.json())
      .then(data=>setPets(data))
    }else{
      fetch(`http://localhost:3001/pets?type=${queryParam}`)
      .then(res=>res.json())
      .then(data=>setPets(data))
    }
  }

  function handleAdopt(id){
    const newPets = pets.map((pet)=>{
      if(pet.id===id){
        pet.isAdopted = true
        return pet
      }
      return pet
    })
    setPets(newPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={setFilters} onFindPetsClick={handleClick} filters={filters}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdopt}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
