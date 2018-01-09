import axios from "axios";
import Rx from "rxjs";

const API_URL = "http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni";

const proxy_URL = 'https://neilmunimap.herokuapp.com/proxy?url=';

const APIurlWithProxy = proxy_URL + API_URL;

export const getVehicles = () =>
  new Promise((resolve, reject) => {
    axios.get(APIurlWithProxy).then(response => resolve(response.data));
  });

export const timer = Rx.Observable.timer(0, 2000);

export const $vehicles = timer.flatMap(() => Rx.Observable.defer(getVehicles));
