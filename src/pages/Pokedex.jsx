import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "../components/pokedex/PokemonList";
import { paginateData } from "../utils/paginate";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([])
  const [currenType, setCurrenType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.includes(pokemonName))

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim())
  }

  const handleChangeType = (e) => {
    setCurrenType(e.target.value)
  }
  //paginacion
  const { itemsInCurrenPage, lastPage, pagesInCurrentBlock } = paginateData(pokemonsByName, currentPage);

  const handlePriviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage)
    }
  }

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  }


  //Trae todos los pokemons
  useEffect(() => {
    if (currenType === "") {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err))
    }

  }, [currenType])


  //Trae todos los types de los pokemons
  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err))
  }, [])
  //Trae todos los pokemons con base a un tipo
  useEffect(() => {
    if (currenType !== "") {
      axios.get(`https://pokeapi.co/api/v2/type/${currenType}/`)
        .then(({ data }) => { setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon)) })
        .catch((err) => console.log(err))
    }
  }, [currenType])

  console.log(pokemons)
  return (
    <main className="bg-[#cccccc] relative w-[100%] mainPokedex pb-10">
      <header className="headerPokedex">
        <div className="redPokedex"></div>
        <div className="blackPokedex"></div>
        <div className="pokedexImg absolute top-[22px] left-[10%] max-w-[330px]">
          <img src="/logo.png" alt="" />
        </div>
      </header>
      <section className="sectionContainer">
        <p className="pt-5 text-[24px]">
          <span className="text-[#FE1936]">Welcome {trainerName},</span> here you can find your favorite pokemon
        </p>
        <form onSubmit={handleSubmit} action="" className="formSearch">
          <div className="containerSearch">
            <input className="px-6 py-3 w-[70%] inputSearch" placeholder="Buscar Pokemon" name="pokemonName" type="text" />
            <button className="px-6 py-3 bg-[#D93F3F] text-[#fff] w-[30%]">Search</button>
          </div>
          <select onChange={handleChangeType} className="capitalize w-[40%] selectContainer" id="">
            <option value="" className="text-[#fff] bg-[#ED8F8F]">All pokemons</option>
            {
              types.map((type) => (
                <option key={type.url} value={type.name}>{type.name}</option>
              ))
            }
          </select>
        </form>
      </section>
      <PokemonList pokemons={itemsInCurrenPage} />
      <ul className="flex justify-center gap-4 flex-wrap">
        {
          currentPage !== 1 && (
            <li>
              <button onClick={handlePriviusPage} className="px-4 py-2 text-white font-bold rounded-md bg-red-600" >{"<"}</button>
            </li>
          )
        }
        {
          pagesInCurrentBlock.map((page) => (
            <li key={page}>
              <button onClick={() => setCurrentPage(page)} className={` px-4 py-2 text-white font-bold rounded-md ${currentPage === page ? "bg-red-500" : "bg-red-400"}`}>{page}</button>
            </li>
          ))
        }
        {
          currentPage !== lastPage && (
            <li>
              <button onClick={handleNextPage} className="px-4 py-2 text-white font-bold rounded-md bg-red-600" >{">"}</button>
            </li>
          )
        }

      </ul>
      <div className="absolute top-[50px] right-[8%] w-[80px] pokebolaHeader">
        <img className="" src="/eclipse.png" alt="" />
        <img className="absolute top-[20%] right-[20%] w-[60%]" src="/eclipse2.png" alt="" />
      </div>
    </main>
  )
}

export default Pokedex