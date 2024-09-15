"use client";
import React from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '300px'
};

interface Point {
    lat: number;
    lng: number;
}

const center: Point = {
    lat: 25.72124867123949,
    lng: 89.27089529818953,
};

const points: Point[] = [
    { lat: 25.72, lng: 89.25 },
    { lat: 25.71, lng: 89.27 },
    { lat: 26.71, lng: 89.27 },
    { lat: 26.71, lng: 90.27 },
];

function MyComponent() {
    return (
        <LoadScript
            googleMapsApiKey={"AIzaSyBDmllHVApHQDqZagkquagW-BCxCOW84ck"}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
            >
                <Polyline path={points} />
                <Marker position={center} label={"Dhaka"} />
                <Marker position={{ lat: 25.71, lng: 89.27 }} label={"Rajshahi"} />
            </GoogleMap>
        </LoadScript>
    );
}

export default React.memo(MyComponent);
