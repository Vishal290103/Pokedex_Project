import { useEffect, useState } from "react";
import axios from "axios";

function usePokemonList(){
    const[pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:''
        
    });

    async function downloadPokemons(){
        // setIsLoading(true);
        // setPrevUrl(response.data.previous);

        //iterating over the array of pokemons ,and using their url ,to create an array of promises
        //that will download those 20 pokemons 
        
            setPokemonListState((state)=> ({
                ...state,
                isLoading:true}));
            // const response=await axios.get(pokedexUrl);//THIS downloads list of 20 pokemons
            const response = await axios.get(pokemonListState.pokedexUrl);
    
            const pokemonResults=response.data.results;//We get the array of pokemon from result
            console.log("response ise",response.data,response.data.pokemon);
            // setNextUrl(response.data.next);
            console.log(pokemonListState);
            setPokemonListState((state)=> ({
                ...state,
                nextUrl:response.data.next,
                prevUrl:response.data.previous
            }));
            
        const pokemonResultPromise= pokemonResults.map((pokemon)=> axios.get(pokemon.url));

        //passing that promises to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) //array of 20 pokemon detail data
        console.log(pokemonData);

        //now iterate on the data of each pokemon, and extract id,name ,image,types
        const pokeListResult=pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types
            }
            

        });
        console.log(pokeListResult);
        // setPokemonList(pokeListResult);
        setPokemonListState((state) =>({
            ...state,
            pokemonList:pokeListResult,
            isLoading:false
        }));
        // setIsLoading(false);
    }
    

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);


    return[pokemonListState,setPokemonListState];
}

export default usePokemonList;