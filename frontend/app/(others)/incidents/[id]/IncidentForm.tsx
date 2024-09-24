"use client";

import useFormComponents from "@/components/useFormComponents";
import { IncidentFormData, incidentSchema } from "./incidentSchema";
import { Incident } from "@/store/models";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentUser } from "@/store/authService";
import { API, ROUTING } from "@/store/config";
import http from "@/store/http";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { toast } from "@/components/ui/use-toast";

interface Props {
  incident?: Incident;
}

const IncidentForm = ({ incident }: Props) => {
  const {
    Select,
    Textarea,
    SubmitBtn,
    handleSubmit,
    setIsSubmitting,
    setValue,
  } = useFormComponents<IncidentFormData>(incidentSchema, {
    incidentType: incident?.incidentType,
    assignedVolunteers: incident?.assignedVolunteers,
    latitude: incident?.latitude || "23.8",
    longitude: incident?.longitude || "90.5",
    description: incident?.description,
  });

  useEffect(() => {
    if (getCurrentUser() === null || getCurrentUser()?.role !== "ADMIN") {
      window.location.href = ROUTING.login;
    }
  }, []);

  const doSubmit = async (data: IncidentFormData) => {
    setIsSubmitting(true);
    try {
      let res;
      if (incident) {
        res = await http.put<Incident>(`${API.incidents}/${incident.id}`, data);
      } else {
        res = await http.post<Incident>(API.incidents, data);
      }
      if (res.status === 201) {
        toast({
          title: "Success!",
          description: "Incident reported successfully!",
          variant: "success",
        });
        window.location.href = ROUTING.incidents;
      } else {
        toast({
          title: "Error!",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error!",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBDmllHVApHQDqZagkquagW-BCxCOW84ck", // Replace with your API key
  });
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 23.8,
    lng: 90.5,
  });

  const onDragEnd = useCallback(() => {
    const map = mapRef.current;
    if (map) {
      const newCenter = map.getCenter();
      if (newCenter) {
        setCenter({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
      }
    }
  }, []);

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
  }, []);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelected({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      setValue("latitude", event.latLng.lat().toString());
      setValue("longitude", event.latLng.lng().toString());
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div>
      <form
        className="horizontal-center lg:max-w-2xl w-full mx-5 md:mx-10 lg:mx-auto p-2"
        onSubmit={handleSubmit(doSubmit)}
      >
        <Select
          name={"incidentType"}
          items={[
            { value: "Flood", label: "Flood" },
            { value: "Cyclone", label: "Cyclone" },
            { value: "Earthquake", label: "Earthquake" },
            { value: "Road Accident", label: "Road Accident" },
            { value: "Fire Outbreak", label: "Fire Outbreak" },
            { value: "Building Collapse", label: "Building Collapse" },
            { value: "Others", label: "Others" },
          ]}
        />
        <Textarea name={"description"} />
        <GoogleMap
          mapContainerStyle={{ height: "50vh", width: "100%" }}
          center={center}
          zoom={11}
          onClick={onMapClick}
          onDragEnd={onDragEnd}
          onLoad={onLoad}
        >
          {selected && (
            <Marker position={{ lat: selected.lat, lng: selected.lng }} />
          )}
        </GoogleMap>
        <SubmitBtn label={`${incident ? "Update" : "Report"} Incident`} />
      </form>
    </div>
  );
};

export default IncidentForm;
