const {
  getPlaceName,
  getAddressComponentByType
} = require('./helpers');
module.exports.composeAddressFromDetailsNew = ({
  addressComponents,
  location,
  id,
  formattedAddress,
  types,
  displayName
}) => {
  const country = getAddressComponentByType(addressComponents, 'country');
  const state = getAddressComponentByType(addressComponents, 'administrative_area_level_1') || getAddressComponentByType(addressComponents, 'administrative_area_level_2');
  const city = getAddressComponentByType(addressComponents, 'locality');
  const street = getAddressComponentByType(addressComponents, 'route');
  const number = getAddressComponentByType(addressComponents, 'street_number');
  const zipCode = getAddressComponentByType(addressComponents, 'postal_code');
  let coordinates = null;

  // $FlowFixMe[unnecessary-optional-chain]
  if (location?.lat && location.lng) {
    coordinates = [location.lat, location.lng];
  }
  return {
    id,
    country,
    state,
    city,
    street,
    number,
    zipCode,
    formattedAddress: `${getPlaceName({
      types,
      displayName
    })}${formattedAddress || ''}`,
    addressNote: '',
    coordinates
  };
};