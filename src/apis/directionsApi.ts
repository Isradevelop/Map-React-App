import axios from "axios";

export const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: true,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiaXNyYWRldmVsb3AiLCJhIjoiY2xjejVrZWZnMTJvYTNvcXI0Njg5dm1pMSJ9.m1wIl9EfkVPzbT-DG3hHyA'
    }
})