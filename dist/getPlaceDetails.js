const {
  getAddressComponentByType
} = require('./helpers');
const {
  composeAddressFromDetails
} = require('./composeAddressFromDetails');
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