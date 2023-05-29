import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_USER_SEARCH_TERMS } from '../utils/mutations';
import jwt_decode from 'jwt-decode';
import Auth from '../utils/auth';


const Home = () => {
  const [animal, setAnimal] = useState(null);
  const [animalFacts, setAnimalFacts] = useState([]);
  const [currentAnimals, setCurrentAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumer] = useState(1);
// If token is stored in local storage
const token = Auth.getToken();


  useEffect(() => {
    if (animalFacts.length > 0) {
      setCurrentAnimals([animalFacts[pageNumber - 1]])
    }
  }, [pageNumber, animalFacts])
  const [addUserSearchTerm] = useMutation(ADD_USER_SEARCH_TERMS);
  const back = () => {
    if (pageNumber > 1) {
      setPageNumer(pageNumber - 1)
    }
  };

  const next = () => {
    if (pageNumber < animalFacts.length) {
      setPageNumer(pageNumber + 1)
    }
  };

  // update state based on input changes
  const handleChange = async (event) => {
    const { value } = event.target;
    setAnimal(value);
  };

  const getFacts = async (event) => {
    event.preventDefault();
    if (animal) {
      if(token) {
        console.log("token" + token);
        const decoded = jwt_decode(token);
        console.log('decoded:', JSON.stringify(decoded));
        const userId = decoded.data._id;  // The payload structure may vary, it could also be decoded.userId or another field
        console.log('userId:', userId);
        try {
          const { data } = await  addUserSearchTerm({variables:{userId:userId,searchTerm: animal}});
    
          console.log(data)
        } catch (e) {
          console.error(e);
        }
      
      }
      
      const response = await axios({
        method: 'get',
        url: 'https://api.api-ninjas.com/v1/animals?name=' + animal,
        headers: { 'X-Api-Key': 'aInKWxB6C9ppm5/rm126Ew==V2Ziy66hV5hb82LJ' },
      })

      const data = response.data;

      setAnimalFacts(data);

      console.log(data);

    }
  }


  return (
    <main>
      <section className="mt-5">
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Enter an animal name..." aria-label="Search" onChange={handleChange} />
          <button className="btn btn-outline-success" onClick={getFacts}>Get Facts</button>
        </form>
      </section>
      <section className='my-5'>
        <ul>
          {currentAnimals.map((species, index) =>
          (
            <li key={index}>
              <h4 className='text-muted'>{species.name}</h4>

              <p>Locations:</p>
              <ul>
                {species.locations.map((loc, i) => (
                  <li key={i}>{loc}</li>
                ))}
              </ul>
              <br></br>

              <p>Taxonomy:</p>
              <ul>
                <li>Kingdom: {species.taxonomy.kingdom}</li>
                <li>Phylum: {species.taxonomy.phylum}</li>
                <li>Class: {species.taxonomy.class}</li>
              </ul>
              <br></br>

              <p>Characteristics:</p>
              <ul>
                <li>Main prey: {species.characteristics.main_prey}</li>
                <li>Distinctive feature: {species.characteristics.distinctive_feature}</li>
                <li>Wingspan: {species.characteristics.wingspan}</li>
                <li>Habitat: {species.characteristics.habitat}</li>
                <li>Predators: {species.characteristics.predators}</li>
                <li>Average clutch size: {species.characteristics.average_clutch_size}</li>
                <li>Color: {species.characteristics.color}</li>
                <li>Diet: {species.characteristics.diet}</li>
                <li>Height: {species.characteristics.height}</li>
                <li>Favorite food: {species.characteristics.favorite_food}</li>
                <li>Skin type: {species.characteristics.skin_type}</li>
                <li>Top speed: {species.characteristics.top_speed}</li>
                <li>Lifespan: {species.characteristics.lifespan}</li>
                <li>Slogan: {species.characteristics.slogan}</li>
                <li>Weight: {species.characteristics.weight}</li>
                <li>Type: {species.characteristics.type}</li>
              </ul>
              <br></br>
            </li>
          )
          )}
        </ul>
        {animalFacts.length > 1 && <span><button onClick={back}>Back</button> 0 ----{pageNumber}---- {animalFacts.length} <button onClick={next}>Next</button></span>}
      </section>
    </main>
  );
};

export default Home;
