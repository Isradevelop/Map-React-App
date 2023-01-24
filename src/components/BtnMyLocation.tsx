import { Button } from "@chakra-ui/react"
import { useContext } from 'react';
import { PlacesContext, MapContext } from "../context";

export const BtnMyLocation = () => {

    const { map, isMapReady } = useContext(MapContext)
    const { userLocation } = useContext(PlacesContext)

    const onClick = () => {
        if (!isMapReady) throw new Error('El mapa no está listo');
        if (!userLocation) throw new Error('No hay ubicación del usuario');

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }

    return (
        <Button
            colorScheme='linkedin'
            className="btn-my-location"
            onClick={onClick}
        >
            Ir a mi ubicación
        </Button>
    )
}
