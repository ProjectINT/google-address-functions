// @flow strict
const { composeAddressFromDetailsNew } = require('./composeAddressFromDetailsNew')
const { v4 } = require('./helpers');

const SUGGESTIONS_ENDPOINT = 'https://places.googleapis.com/v1/places:autocomplete';
const DETAILS_ENDPOINT = 'https://places.googleapis.com/v1/places';

type SuggestionOption = {
  formattedAddress: string,
  place_id: string,
};

type PlaceDetailsWithOriginLocale = {
  origin: Address,
  localized: Address,
};

type LanguageCode = 'en' | 'af' | 'sq' | 'am' | 'ar' | 'hy' | 'az' | 'eu' | 'be' | 'bn' | 'bs' | 'bg' | 'my' | 'ca' | 'zh' | 'zh-CN' | 'zh-HK' | 'zh-TW' | 'hr' | 'cs' | 'da' | 'nl' | 'en' | 'en-AU' | 'en-GB' | 'et' | 'fa' | 'fi' | 'fil' | 'fr' | 'fr-CA' | 'gl' | 'ka' | 'de' | 'el' | 'gu' | 'iw' | 'hi' | 'hu' | 'is' | 'id' | 'it';

type PlacesAutocompleteProps = {
  googleApiKey: string,
  searchLength: number,
  languageCode?: LanguageCode,
};

type PlacesFunctions = {
  getSuggestions: (actualQuery: string) => Promise<SuggestionOption[]>,
  getPlaceDetails: (placeId: string) => Promise<Address>,
  getPlaceDetailsWithOriginLocale: (placeId: string) => Promise<PlaceDetailsWithOriginLocale>,
};

type FetchPlaceDetails = {
  placeId: string,
  sessionToken: string,
  languageCode: LanguageCode,
  googleApiKey: string
}

async function fetchPlaceDetails({ placeId, sessionToken, languageCode, googleApiKey }: FetchPlaceDetails) {
  return fetch(`${DETAILS_ENDPOINT}/${placeId}?sessionToken=${sessionToken}&languageCode=${languageCode}`, {
    method: 'GET',
    headers: {
      'X-Goog-FieldMask': 'id,addressComponents,location,types,formattedAddress,displayName', // Specify the fields you need
      'X-Goog-Api-Key': googleApiKey,
    },
  });
}

function placesAutocompleteNew({ googleApiKey, searchLength, languageCode = 'en' }: PlacesAutocompleteProps): PlacesFunctions {
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
          languageCode: languageCode,
          input: actualQuery,
          sessionToken,
        }),
      });
    
      const response = await suggestions.json();
    
      const resultSuggestions = formatSuggestions(response.suggestions || []);
    
      return resultSuggestions;
    },
    async getPlaceDetails(placeId: string): Promise<Address> {
      const response = await fetchPlaceDetails({
        placeId,
        sessionToken,
        languageCode,
        googleApiKey
      });

      const data = await response.json();
      
      sessionToken = v4();

      return composeAddressFromDetailsNew(data);
    },
    async getPlaceDetailsWithOriginLocale(placeId: string): Promise<PlaceDetailsWithOriginLocale> {
      const responseOrigin = await fetchPlaceDetails({
        placeId,
        sessionToken,
        languageCode: "en",
        googleApiKey
      });

      const responseLocalized = await fetchPlaceDetails({
        placeId,
        sessionToken,
        languageCode,
        googleApiKey
      });

      const responses = await Promise.all([
        responseOrigin,
        responseLocalized,
      ]);

      const data = await Promise.all([
        responses[0].json(),
        responses[1].json()
      ]);
      
      sessionToken = v4();

      return {
        origin: composeAddressFromDetailsNew(data[0]),
        localized: composeAddressFromDetailsNew(data[1]),
      }
    }
  }
}

module.exports.placesAutocompleteNew = placesAutocompleteNew;