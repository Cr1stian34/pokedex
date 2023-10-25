import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { bgByType, brByType, colorByType } from "../../constants/pokemon";

const PokemonCard = ({ pokemonUrl }) => {
    // console.log(pokemonUrl);
    const [pokemon, setPokemon] = useState(null)
    useEffect(() => {
        axios.get(pokemonUrl)
            .then(({ data }) => setPokemon(data))
            .catch((err) => console.log(err))
    }, [])

    // console.log(pokemon)
    // console.log(pokemon?.types[0].type.name)
    return (
        <article style={{border: `${brByType[pokemon?.types[0].type.name]}`}} className="cardPokemon relative">
            <Link to={`${pokemon?.id}`} className="capitalize">
                <header style={ {background: `${bgByType[pokemon?.types[0].type.name]}`}} className={`w-[100%] h-[110px]`}></header>
                <div className="bg-[#fff]">
                    <div className="absolute w-[150px] top-[10px] left-[20%]">
                        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                    </div>
                    <div className="flex flex-col justify-center items-center pt-[2.8rem]">
                        <h3 style={{color: `${colorByType[pokemon?.types[0].type.name]}`}} className={"text-[25px]"}>{pokemon?.name}</h3>
                        <span>{pokemon?.types.map((type) => type.type.name).join(" / ")}</span>
                        <h5 className="text-[#9F9F9F]">type</h5>
                    </div>

                    <ul className="listaCard p-4">
                        {
                            pokemon?.stats.slice(0, 4).map((stat) => (
                                <li key={stat.stat.name} className="flex flex-col justify-center items-center">
                                    <h6 className="text-[#9F9F9F]">{stat.stat.name}</h6>
                                    <span style={{color: `${colorByType[pokemon?.types[0].type.name]}`}} className="text-[20px]">{stat.base_stat}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Link>
        </article>
    )
}

export default PokemonCard