const {
  placesTypes
} = require('./placesTypes');
const getAddressComponentByType = (components, type) => {
  const component = components.find(({
    types
  }) => types.includes(type));
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
const composeAddressFromDetails = ({
  result,
  placeId
}) => {
  const {
    address_components: addressComponents,
    geometry
  } = result;

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
    coordinates
  };
};
const getPlaceDetails = ({
  placeId,
  placesService,
  PlacesServiceStatus
}) => new Promise((resolve, reject) => {
  if (!placesService) {
    return reject(new Error('PlacesService is not initialized'));
  }
  const request = {
    placeId,
    fields: ['address_components', 'formatted_address', 'name', 'types', 'geometry']
  };
  placesService.getDetails(request, (result, status) => {
    if (status !== PlacesServiceStatus.OK) {
      reject();
      return;
    }
    const address = composeAddressFromDetails({
      result,
      placeId
    });
    resolve(address);
  });
});
module.exports.getPlaceDetails = getPlaceDetails;
module.exports.composeAddressFromDetails = composeAddressFromDetails;