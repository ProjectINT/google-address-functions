// @flow strict
const { placesTypes } = require('./placesTypes');
const { getPlaceName, getAddressComponentByType } = require('./helpers');

module.exports.composeAddressFromDetails = ({ result, placeId }: { placeId: string, result: Place }): Address => {
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

    return {
      id: placeId,
      country,
      state,
      city,
      street,
      number,
      zipCode,
      formattedAddress: `${getPlaceName({ placeTypes: result.types, displayName: result.name })}${result.formatted_address || ''}`,
      addressNote: '',
      coordinates,
    }
};