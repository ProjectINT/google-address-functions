// @flow strict
const { getAddressComponentByType } = require('./helpers');
const { composeAddressFromDetails } = require('./composeAddressFromDetails');

type Params = {
  placeId: string,
  placesService: $FlowFixMe, // typeof google.maps.places.PlaceService,
  PlacesServiceStatus: $FlowFixMe, // typeof google.maps.places.PlacesServiceStatus,
}

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