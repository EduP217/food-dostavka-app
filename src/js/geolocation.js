import { getCookie, setCookie, setLocalStorage, getLocalStorage } from './utils.js'

export default class Geolocation {
    constructor() {
        this.addressElement;
        this.autocomplete;
        this.place;
    }
    init() {
        return new Promise((res,rej) => {
            this.initMap();
            res();
        });
    }
    initMap() {
        this.addressElement = document.querySelector("#ship-address");
        google.maps.event.addDomListener(window, 'load', this.initialize.bind(this));
    }
    async initialize() {
        this.autocomplete = new google.maps.places.Autocomplete(this.addressElement, {
            componentRestrictions: {
                country: ["us", "ca", "pe"]
            },
            fields: ["address_components", "geometry", "formatted_address", "place_id"],
            types: ["address"],
        });
        this.autocomplete.addListener("place_changed", this.getPlace.bind(this));
        
        if(!getCookie('currentPositionLat') && !getCookie('currentPositionLng')){
            await this.getCurrentLocation().then((pos) => {
                /*const cookieLat = parseFloat(getCookie('currentPositionLat'));
                const cookieLng = parseFloat(getCookie('currentPositionLng'));
                const latlng = new google.maps.LatLng(cookieLat, cookieLng);*/
                const latlng = new google.maps.LatLng(pos.lat, pos.lng);
                console.log(latlng);

                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'latLng': latlng
                }, function (results, status) {
                    console.log(results);
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results.length > 0) {
                            //const resultFind = results.find(r => r.types.includes("street_address"));
                            const resultFind = results[0];
                            console.log(resultFind);
                            setLocalStorage('currentPositionGeolocation', resultFind);
                            document.getElementById('ship-address-selected').value = resultFind.formatted_address;
                        } else {
                            console.log('No results found');
                        }
                    } else {
                        console.error('Geocoder failed due to: ' + status);
                    }
                });
            });
            document.getElementById('site-modal').style.display = 'block';
        }

        this.place = getLocalStorage('currentPositionGeolocation');
        document.getElementById('ship-address-selected').value = this.place.formatted_address;
    }
    getCurrentLocation(){
        return new Promise((res,rej) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let pos = {
                        lat : position.coords.latitude,
                        lng : position.coords.longitude
                    }
                    setCookie('currentPositionLat',pos.lat,30);
                    setCookie('currentPositionLng',pos.lng,30);
                    res(pos);
                });
            } else {
                // Browser doesn't support Geolocation
                console.warn('could not get your location.');
                rej();
            }
        });
    }
    getPlace() {
        this.place = this.autocomplete.getPlace();
        console.log(this.place);
        this.addressElement.value = this.place.formatted_address;
    }
    savePlace() {
        setCookie('currentPositionLat',this.place.geometry.location.lat(),30);
        setCookie('currentPositionLng',this.place.geometry.location.lng(),30);
        setLocalStorage('currentPositionGeolocation', this.place);
        document.getElementById('ship-address-selected').value = this.place.formatted_address;
    }
}