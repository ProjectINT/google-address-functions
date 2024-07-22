// @flow strict
const { composeAddressFromDetailsNew } = require('./composeAddressFromDetailsNew')
const { v4 } = require('./helpers');

const SUGGESTIONS_ENDPOINT = 'https://places.googleapis.com/v1/places:autocomplete';
const DETAILS_ENDPOINT = 'https://places.googleapis.com/v1/places';

type SuggestionOption = {
  formattedAddress: string,
  place_id: string,
};

type PlacesAutocompleteProps = {
  googleApiKey: string,
  searchLength: number,
};

type PlacesFunctions = {
  getSuggestions: (actualQuery: string) => Promise<SuggestionOption[]>,
  getPlaceDetails: (placeId: string) => Promise<Address>,
}

function placesAutocompleteNew({ googleApiKey, searchLength }: PlacesAutocompleteProps): PlacesFunctions {
  const formatSuggestions = (response: Array<{ placePrediction: PlacePrediction }>): SuggestionOption[] => {
    const formatPrediction = (prediction: PlacePrediction) => ({
      formattedAddress: prediction.text.text,
      place_id: prediction.placeId,
    });
    const formatted = response.map(({ placePrediction }) => formatPrediction(placePrediction));
  
    return formatted;
  };

  let sessionToken = v4();

  return {
    async getSuggestions (actualQuery: string): Promise<SuggestionOption[]> {
      const suggestions = await fetch(SUGGESTIONS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': googleApiKey,
        },
        body: JSON.stringify({
          input: actualQuery,
          sessionToken,
        }),
      });
    
      const response = await suggestions.json();
    
      const resultSuggestions = formatSuggestions(response.suggestions || []);
    
      return resultSuggestions;
    },
    async getPlaceDetails(placeId: string): Promise<Address> {
      const response = await fetch(`${DETAILS_ENDPOINT}/${placeId}?sessionToken=${sessionToken}`, {
        method: 'GET',
        headers: {
          'X-Goog-FieldMask': 'id,addressComponents,location,types,formattedAddress,displayName', // Specify the fields you need
          'X-Goog-Api-Key': googleApiKey,
        },
      });

      const data = await response.json();
      
      sessionToken = v4();

      return composeAddressFromDetailsNew(data);
    }
  }
}

module.exports.placesAutocompleteNew = placesAutocompleteNew;