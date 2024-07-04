// @flow strict
const { placesTypes } = require('./placesTypes');

type Params = {
  placeId: string,
  placesService: $FlowFixMe, // typeof google.maps.places.PlaceService,
  PlacesServiceStatus: $FlowFixMe, // typeof google.maps.places.PlacesServiceStatus,
}

type AddressComponent = {
  types: Array<string>,
  long_name: string,
  short_name: string,
}

type Address = {|
  id: string,
  city: string,
  country: string,
  formattedAddress: string,
  addressNote?: ?string,
  number?: ?string,
  state?: ?string,
  street?: ?string,
  zipCode?: ?string,
  coordinates: ?Array<number>,
|};

const getAddressComponentByType = (
  components: Array<AddressComponent>,
  type: string,
): string => {
  const component = components.find(({ types }) => types.includes(type));
  
  if (component) {
    if (component.long_name) {
      return component.long_name;
    }
    if (component.short_name) {
      return component.short_name;
    }
    return '';
  }
  return '';
};

type Place = {
  address_components: Array<AddressComponent>,
  formatted_address?: string,
  geometry?: {
    location: {
      lat: () => number,
      lng: () => number,
    },
    viewport: {
      northeast: { lat: number, lng: number },
      southwest: { lat: number, lng: number },
    },
  },
  name: string,
  types: Array<string>,
}

type PlaceDetails = {
  html_attributions: Array<string>,
  result: Place,
  status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR',
};

const composeAddressFromDetails = ({ result, placeId }: { placeId: string, result: Place }): Address => {
  const { address_components: addressComponents, geometry } = result;

    // https://developers.google.com/maps/documentation/geocoding/start#Types
    const country = getAddressComponentByType(addressComponents, 'country');
    const state = getAddressComponentByType(addressComponents, 'administrative_area_level_1') || getAddressComponentByType(addressComponents, 'administrative_area_level_2');
    const city = getAddressComponentByType(addressComponents, 'locality');
    const street = getAddressComponentByType(addressComponents, 'route');
    const number = getAddressComponentByType(addressComponents, 'street_number');
    const zipCode = getAddressComponentByType(addressComponents, 'postal_code');

    let coordinates = null;

    // $FlowFixMe[unnecessary-optional-chain]
    if (typeof geometry?.location?.lat === 'function' && typeof geometry.location?.lng === 'function') {
      coordinates = [geometry.location.lat(), geometry.location.lng()];
    }

    const getPlaceName = () => {
      // eslint-disable-next-line no-restricted-syntax
      for (const type of result.types) {
        if (placesTypes.includes(type)) {
          return `${result.name} `;
        }
      }
      return '';
    };

    return {
      id: placeId,
      country,
      state,
      city,
      street,
      number,
      zipCode,
      formattedAddress: `${getPlaceName()}${result.formatted_address || ''}`,
      addressNote: '',
      coordinates,
    }
};


const getPlaceDetails = ({ placeId, placesService, PlacesServiceStatus }: Params): Promise<Address> => new Promise((resolve, reject) => {

  if (!placesService) {
    return reject(new Error('PlacesService is not initialized'));
  }

  const request = {
    placeId,
    fields: ['address_components', 'formatted_address', 'name', 'types', 'geometry'],
  };

  placesService.getDetails(request, (result, status) => {
    if (status !== PlacesServiceStatus.OK) {
      reject();
      return;
    }

    const address = composeAddressFromDetails({ result, placeId })

    resolve(address);
  });
});

module.exports.getPlaceDetails = getPlaceDetails;

module.exports.composeAddressFromDetails = composeAddressFromDetails;
