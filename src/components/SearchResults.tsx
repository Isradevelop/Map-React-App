import { useContext, useState } from 'react';
import { Button, Center, Divider, List, ListItem, Spinner, Text } from "@chakra-ui/react"
import { Feature } from '../interfaces/places';
import { MapContext, PlacesContext } from '../context';

export const SearchResults = () => {

    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
    const { map, getRoutesBetweenPoints } = useContext(MapContext);
    const [listItemSelectedId, setListItemSelectedId] = useState<string>("")

    const OnPlaceClicked = (place: Feature, placeId: string) => {
        const [lng, lat] = place.center;
        setListItemSelectedId(placeId);
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    const getRoute = (place: Feature) => {
        if (!userLocation) return;

        const [lng, lat] = place.center;
        getRoutesBetweenPoints(userLocation, [lng, lat])
    }

    return (
        (isLoadingPlaces)
            ? (
                <div>
                    <Center>
                        <Spinner p={4} />
                    </Center>
                </div>
            )
            : (
                <List>
                    {
                        places.map((place) => (
                            <ListItem
                                key={place.id}
                                p={2}
                                className={`pointer ${(listItemSelectedId != place.id) ? "" : "selected-item"}`}
                                onClick={() => OnPlaceClicked(place, place.id)}
                            >
                                <Divider />
                                <Text fontSize='xl'>{place.text_es}</Text>
                                <Text className="text-muted" fontSize='sm'>
                                    {place.place_name_es}
                                </Text>
                                <Button
                                    onClick={() => getRoute(place)}
                                    colorScheme='linkedin'
                                    variant={(listItemSelectedId != place.id) ? "solid" : "outline"}
                                    size='xs'
                                >Ir a ubicación</Button>
                            </ListItem>
                        ))
                    }
                </List>
            )
    )
}
