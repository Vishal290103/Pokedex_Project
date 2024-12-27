import useDebounce from '../hooks/useDebounce';
import './Search.css';
function Search({updateSearchTerm}){
    const debouncedCallBack = useDebounce((e)=> updateSearchTerm(e.target.value));

    return(
        <div className='search-wrapper'>
        <input 
        id="pokemon-name-search"
            type='text'
            placeholder="pokemon name..."
            onChange={debouncedCallBack}
            />
        </div>

    );
}

export default Search;