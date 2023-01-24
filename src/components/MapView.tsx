import { Card } from '@chakra-ui/react';
import { Map } from 'mapbox-gl';
import { useContext, useLayoutEffect, useRef } from 'react';
import { MapContext, PlacesContext } from '../context';
import { Loading } from "./Loading";

export const MapView = () => {

    const { isLoading, userLocation } = useContext(PlacesContext);
    const { setMap, map } = useContext(MapContext);

    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 12, // starting zoom
            });
            setMap(map);
        }
    }, [isLoading])


    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <Card id="instructions"></Card>

            <div ref={mapDiv} className="map-container">
            </div>
        </>
    )
}
