import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { bgByType, brByType, colorByType } from "../constants/pokemon"

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)

  const { pokemonId } = useParams();
  console.log(pokemonId)
  console.log(pokemon)

  const getPorcentStat = (statValue) => {
    const MAX_STAT_VALUE = 255;
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1);
    return `${percentStat}%`
  }

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <main className="w-[100%] pb-[4rem] relative text-center capitalize bg-[#E5E5E5]">
      <header className="headerPokedex">
        <div className="redPokedex"></div>
        <div className="blackPokedex"></div>
        <div className="logoHeader absolute top-[22px] left-[10%] max-w-[330px]">
          <img src="/logo.png" alt="" />
        </div>
      </header>
      <article className="max-w-[70%] mt-[8rem] mx-auto articleDetail bg-[#fff]">
        <header className="relative">
          <div style={{background: `${bgByType[pokemon?.types[0].type.name]}`}} className="headerDetail"></div>
          {/* max-w-[250px] absolute top-[-100%] left-[35%]  */}
          <div className="pokemon ">
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
          </div>
        </header>
        {/* py-[1rem] px-[8rem] */}
        <div className=" cardContainer">
          <h3 style={{color: `${colorByType[pokemon?.types[0].type.name]}`}} className="text-[40px]">#{pokemon?.id}</h3>
          <h2 style={{color: `${colorByType[pokemon?.types[0].type.name]}`}} className="text-[45px]">{pokemon?.name}</h2>
          <div className="flex justify-center gap-[3rem] text-[#0F0F2D]">
            <div>
              <h6>Peso</h6>
              <span className="text-[20px]">{pokemon?.weight}</span>
            </div>
            <div>
              <h6>Altura</h6>
              <span className="text-[20px]">{pokemon?.height}</span>
            </div>
          </div>
          {/* tipo y habilidades */}
          <article className="flex justify-center gap-5 mt-10 mb-[4rem] max-w-[100%] cardTH">
            <div className="grid gap-3">
              <h3 className="text-[20px]">Type</h3>
                <ul className="flex gap-3 text-[#fff] tipo">
                   {
                    pokemon?.types.map((type)=>(
                      <li key={type.type.url} style={{background: `${colorByType[type.type.name]}`}} className="px-[3rem] py-2">
                        <span>{type.type.name}</span>
                      </li>
                    ))
                   }
                </ul>
            </div>

            <div className="grid gap-3">
              <h3 className="text-[20px]">Abilities</h3>
                <ul className="flex gap-3 tipo">
                  {
                    pokemon?.abilities.map((ability)=>(
                      <li key={ability.ability.url} className="px-[3rem] py-2 border-solid border-2 border-slate-300">
                        <span>{ability.ability.name}</span>
                      </li>
                    ))
                  }
                </ul>
            </div>
          </article>
          <section className="mb-10">
            <h3 className="text-start text-[45px] mb-5" >Stats</h3>
            <ul className="grid gap-6">
              {
                pokemon?.stats.map((stat) => (
                  <li className="capitalizev grid gap-2" key={stat.stat.name}>
                    <div className="flex justify-between items-center">
                      <h5>{stat.stat.name}</h5>
                      <span>{stat.base_stat}/255</span>
                    </div>
                    {/* total bar */}
                    <div className="bg-slate-200 rounded-md h-6 overflow-hidden">
                      {/* bar progres */}
                      <div style={{ width: getPorcentStat(stat.base_stat) }} className="bg-yellow-400 h-full"></div>
                    </div>
                  </li>))
              }
            </ul>
          </section>
        </div>

      </article>
      <div className="absolute top-[50px] right-[8%] w-[80px] eclipseDetail">
        <img className="" src="/eclipse.png" alt="" />
        <img className="absolute top-[20%] right-[20%] w-[60%]" src="/eclipse2.png" alt="" />
      </div>

      <section className="movementsSection p-7 bg-[#fff]" >
        <h2 className="text-start text-[30px]">Movements</h2>
          <ul className="listMovements">
            {
              pokemon?.moves.slice(0, 24).map((move) => (
                <li key={move.move.url} className="rounded-[50px] bg-[#E5E5E5] text-[18px] flex justify-center items-center py-2">
                  <span >{move.move.name}</span>
                </li>))
            }
          </ul>
      </section>
    </main>
  )
}

export default PokemonDetail