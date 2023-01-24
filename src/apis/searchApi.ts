import axios from "axios";

export const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        country: 'es',
        access_token: 'pk.eyJ1IjoiaXNyYWRldmVsb3AiLCJhIjoiY2xjejVrZWZnMTJvYTNvcXI0Njg5dm1pMSJ9.m1wIl9EfkVPzbT-DG3hHyA'
    }
})