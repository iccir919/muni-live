import axios from "axios";
import Rx from "rxjs";

const API_URL = "http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni";

function getProxyURL() {
  if (window.location.hostname === 'localhost') {
      return 'proxy?url=';
  } else {
      return 'https://neilmunimap.herokuapp.com/proxy?url=';
  }

}

function isSecure() {
  if (window.location.protocol.indexOf('https:') > -1) {
      return getProxyURL();
  } else {
      return '';
  }

}

const API_URL_with_proxy = isSecure() + API_URL;

export const getVehicles = () =>
  new Promise((resolve, reject) => {
    axios.get(API_URL_with_proxy).then(response => resolve(response.data));
  });

export const timer = Rx.Observable.timer(0, 2000);

export const $vehicles = timer.flatMap(() => Rx.Observable.defer(getVehicles));
