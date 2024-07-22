"use client";

import useModels from "@/store/useModels";
import { Alert } from "@/store/models";
import { API } from "@/store/config";
import Marquee from "react-fast-marquee";

const Alerts = () => {
  const { data: alerts } = useModels<Alert>(API.alerts);
  if (!alerts) return null;
  return (
    <Marquee className={"mt-3 mb-2 bg-red-100 rounded-lg"}>
      {alerts.map((alert) =>
        alert.isActive ? ` ** ${alert.description} ** ` : "",
      )}
    </Marquee>
  );
};

export default Alerts;
