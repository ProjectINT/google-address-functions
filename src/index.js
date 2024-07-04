const { getPlaceDetails, composeAddressFromDetails } = require('./getPlaceDetails');
const { placesTypes } = require('./placesTypes');
const { placeIdFromText } = require('./placeIdFromText');

module.exports = {
  getPlaceDetails,
  placesTypes,
  placeIdFromText,
  composeAddressFromDetails,
}
