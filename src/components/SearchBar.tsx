import { Input } from "@chakra-ui/react"
import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {

    const debounceRef = useRef<any>();
    const { searchPlacesByTerm } = useContext(PlacesContext)

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 350)
    }

    return (
        <div className="search-container">
            <Input
                type="text"
                placeholder="Buscar lugar..."
                onChange={onQueryChange}
            />

            <SearchResults />
        </div>
    )
}
