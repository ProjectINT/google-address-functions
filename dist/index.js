const {
  getPlaceDetails
} = require('./getPlaceDetails');
const {
  composeAddressFromDetails
} = require('./composeAddressFromDetails');
const {
  composeAddressFromDetailsNew
} = require('./composeAddressFromDetailsNew');
const {
  placesTypes
} = require('./placesTypes');
const {
  placesAutocompleteNew
} = require('./placesAutocompleteNew');
module.exports = {
  getPlaceDetails,
  placesTypes,
  composeAddressFromDetails,
  composeAddressFromDetailsNew,
  placesAutocompleteNew
};