import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapsApp } from './MapsApp';
import './styles.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { ChakraProvider } from '@chakra-ui/react';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXNyYWRldmVsb3AiLCJhIjoiY2xjejVrZWZnMTJvYTNvcXI0Njg5dm1pMSJ9.m1wIl9EfkVPzbT-DG3hHyA';

if (!navigator.geolocation) {
  alert('Tu navegador no tiene Geolocalización');
  throw new Error('Tu navegador no tiene Geolocalización');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MapsApp />
    </ChakraProvider>
  </React.StrictMode>,
)
