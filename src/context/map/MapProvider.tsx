import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { useReducer, useContext, useEffect } from 'react';
import { MapReducer } from './MapReducer';
import { PlacesContext } from '..';
import { directionsApi } from '../../apis/directionsApi';
import { DirectionsResponse } from '../../interfaces/directions';

export interface MapState {
    isMapReady: boolean,
    map?: Map,
    markers: Marker[],
    minutes: number,
    kms: number
}

const INIT_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
    minutes: 0,
    kms: 0
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(MapReducer, INIT_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach((marker: Marker) => marker.remove())
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup()
                .setHTML(`
                        <Text className="text-muted" fontSize='sm'>
                            ${place.place_name_es}
                        </Text>
                    `)
            const newMarker = new Marker()
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(state.map!)

            newMarkers.push(newMarker);

            dispatch({ type: 'setMarkers', payload: newMarkers })
        }


    }, [places])

    const setMap = (map: Map) => {
        const myLocationPopup = new Popup()
            .setHTML(`
            <h4>Aquí estoy</h4>
            `)

        new Marker({
            color: 'rgb(9, 224, 9)'
        })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map)

        dispatch({ type: 'setMap', payload: map })
    }

    const getRoutesBetweenPoints = async (start: [number, number], end: [number, number]) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);

        //first layer
        const { distance, duration, geometry, legs } = resp.data.routes[0];
        const { coordinates: coords } = geometry;

        //SECOND LAYER
        // const { distance: distance2, duration: duration2, geometry: geometry2 } = resp.data.routes[1];
        // const { coordinates: coords2 } = geometry2;

        let kms = distance / 1000;
        kms = Math.round(kms * 100);
        kms /= 100;

        const minutes = Math.floor(duration / 60);

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        //SECONDARY LAYER
        // for (const coord of coords2) {
        //     const newCoord: [number, number] = [coord[0], coord[1]];
        //     bounds.extend(newCoord);
        // }

        state.map?.fitBounds(bounds, {
            padding: 200
        });

        //Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                    // SECONDARY LAYER
                    // ,
                    // {
                    //     type: 'Feature',
                    //     properties: {},
                    //     geometry: {
                    //         type: 'LineString',
                    //         coordinates: coords2
                    //     }
                    // }
                ]
            }
        }

        if (state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        });

        const instructions = document.getElementById('instructions');
        instructions!.innerHTML = `
                <strong>Datos del viaje</strong>
                <p>
                    Distancia: ${kms} kms
                    </br>
                    Duración: ${minutes} minutos
                </p>
            `;
    }

    return (
        <MapContext.Provider value={{
            ...state,
            // Methods
            setMap,
            getRoutesBetweenPoints
        }}>
            {children}
        </MapContext.Provider>
    )
}
