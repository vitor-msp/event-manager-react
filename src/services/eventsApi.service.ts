import {
  IAddEventResponse,
  IEvent,
  IEventsBackend,
  IGetEventsRequest,
} from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { api, injectJwt } from "./baseApi.service";

export const getEventsRequestApi = async (
  getEventsRequest: IGetEventsRequest,
  jwt: string
): Promise<IEventsBackend> => {
  const { month, year } = getEventsRequest;

  // const res = await api.get<IEventsBackend, IEventsBackend, IGetEventsRequest>(
  const res = await api
    .get(`/event?month=${month}&year=${year}`, {
      headers: injectJwt(jwt),
    })
    .then((res) => res)
    .catch((error) => error.response);

  // console.log(res);

  return res.data;
};

export const addEventRequestApi = async (
  event: IEvent,
  jwt: string
): Promise<IAddEventResponse> => {
  const res = await api.post("/event", event, {
    headers: injectJwt(jwt),
  });

  return res.data;
};

export const editEventRequestApi = async (
  event: IEvent,
  jwt: string
): Promise<any> => {
  const res = await api
    .put("/event", event, {
      headers: injectJwt(jwt),
    })
    .then((res) => res)
    .catch((error) => error.response);

  return res.data;
};

export const cancelEventRequestApi = async (
  eventId: number,
  jwt: string
): Promise<any> => {
  const reqBody = {
    eventId,
  };

  const res = await api
    .delete("/event", {
      headers: injectJwt(jwt),
      data: reqBody,
    })
    .then((res) => res)
    .catch((error) => error.response);

  return res.data;
};

export const exitEventRequestApi = async (
  eventId: number,
  jwt: string
): Promise<any> => {
  const reqBody = {
    eventId,
  };

  const res = await api
    .put("/event/exit", reqBody, {
      headers: injectJwt(jwt),
    })
    .then((res) => res)
    .catch((error) => error.response);

  return res.data;
};
