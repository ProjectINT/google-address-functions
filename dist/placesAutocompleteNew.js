const {
  composeAddressFromDetailsNew
} = require('./composeAddressFromDetailsNew');
const SUGGESTIONS_ENDPOINT = 'https://places.googleapis.com/v1/places:autocomplete';
const DETAILS_ENDPOINT = 'https://places.googleapis.com/v1/places';
function placesAutocompleteNew({
  googleApiKey,
  searchLength
}) {
  const formatSuggestions = response => {
    const formatPrediction = prediction => ({
      formattedAddress: prediction.text.text,
      place_id: prediction.placeId
    });
    const formatted = response.map(({
      placePrediction
    }) => formatPrediction(placePrediction));
    return formatted;
  };
  return {
    async getSuggestions(actualQuery) {
      /* To prevent the user from typing in less than 3 characters and getting a list of suggestions. */
      // $FlowFixMe[incompatible-type] flow not understand that actualQuery is not undefined

      if (actualQuery && actualQuery.length !== 0 && actualQuery.length < searchLength) {}
      const suggestions = await fetch(SUGGESTIONS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': googleApiKey
        },
        body: JSON.stringify({
          input: actualQuery
        })
      });
      const response = await suggestions.json();
      console.log('response', response);
      const resultSuggestions = formatSuggestions(response.suggestions);
      return resultSuggestions;
    },
    async getPlaceDetails(placeId) {
      const response = await fetch(`${DETAILS_ENDPOINT}/${placeId}`, {
        method: 'GET',
        headers: {
          'X-Goog-FieldMask': 'id,addressComponents,location,types,formattedAddress,displayName',
          // Specify the fields you need
          'X-Goog-Api-Key': googleApiKey
        }
      });
      const data = await response.json();
      return composeAddressFromDetailsNew(data);
    }
  };
}
module.exports.placesAutocompleteNew = placesAutocompleteNew;