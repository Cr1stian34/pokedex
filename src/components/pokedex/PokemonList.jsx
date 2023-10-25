import PokemonCard from "./PokemonCard"

const PokemonList = ({pokemons}) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,_270px)] justify-center gap-5 px-4 py-10">
      {
        pokemons.map((pokemon)=><PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>)
      }
    </section>
  )
}

export default PokemonList