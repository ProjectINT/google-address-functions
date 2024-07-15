# google-address-functions

Functions for interacting with Google Places API to handle address details.

## Installation

```bash
yarn add google-address-functions
```

```js

const {
  getPlaceDetails,
  getPlaceIdFromText,
  composeAddressFromDetails,
} = require('google-address-functions');

```

# To compose correct address type use composeAddressFromDetails:

```js
type Address = {
  id: string;
  city: string;
  country: string;
  formattedAddress: string;
  addressNote?: string | null;
  number?: string | null;
  state?: string | null;
  street?: string | null;
  zipCode?: string | null;
  coordinates?: Array<number> | null;
};

type ComposeAddressFromDetailsArgs = {
  response: Place; // https://developers.google.com/maps/documentation/places/web-service/details#Place
  placeId: string;
}

/**
 * Composes an address from the details provided.
 *
 * @param {ComposeAddressFromDetailsArgs} args - Object containing the response from the Google Places API and a placeId.
 * @returns {Address} - The composed address object.
 *
 * @example
 * const placeDetails = {
 *   // Details from the Google Places API response
 * };
 * const placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4";
 *
 * const address: Address = composeAddressFromDetails({ response: placeDetails, placeId });
 *
 * @see https://developers.google.com/maps/documentation/places/web-service/details#Place for details on the response object.
 */

const address: Address = composeAddressFromDetails<ComposeAddressFromDetailsArgs>({ response, placeId });
```

# Autocomplete (new) functionality:

## composeAddressFromDetailsNew Function

This function `composeAddressFromDetailsNew` transforms structured address components and location details into a standardized address format. It is particularly useful for applications integrating with Google Maps Geocoding API or similar services.

## Function Signature

```javascript
/**
 * Compose an Address object from detailed address components and location.
 * @param {ComposeAddressFromDetailsNewArg} params - The input parameters object.
 * @returns {Address} - The composed address object.
 */
const composeAddressFromDetailsNew = ({ addressComponents, location, placeId }: ComposeAddressFromDetailsNewArg): Address => {
  // function body
};
```
## Parameters

- `addressComponents` (Array): An array of address components obtained from a geocoding service.
- `location` ({ lat: number, lng: number }): The geographic coordinates (latitude and longitude) of the place.
- `placeId` (string): A unique identifier for the place.

## Return Value

The function returns an `Address`


## Usage

### Example usage of `composeAddressFromDetailsNew`:

```javascript
const addressComponents = [
  { type: 'country', name: 'United States' },
  { type: 'administrative_area_level_1', name: 'California' },
  { type: 'locality', name: 'San Francisco' },
  { type: 'route', name: 'Market St' },
  { type: 'street_number', name: '123' },
  { type: 'postal_code', name: '94103' },
];

const location = { lat: 37.7749, lng: -122.4194 };
const placeId = 'ChIJZa6ezJa8j4AR1p1nTSaRtuQ';

const result = composeAddressFromDetailsNew({ addressComponents, location, placeId });
console.log(result);
```

# PlacesAutocompleteNew Class

The `placesAutocompleteNew` function returns methods to fetch address suggestions and details using the Google Places API.


```js

type PlacesFunctions = {
  getSuggestions: (actualQuery: string) => Promise<SuggestionOption[]>,
  getPlaceDetails: (placeId: string) => Promise<Address>,
}

const { placesAutocompleteNew } = require('google-address-functions');

const { getSuggestions, getPlaceDetails }: PlacesFunctions = placesAutocompleteNew({
  googleApiKey: 'YOUR_GOOGLE_API_KEY',
  searchLength: 3, // after which character send request
});

getSuggestions('1600 Amphitheatre Parkway').then((suggestions) => {
  console.log(suggestions);
});

getPlaceDetails('ChIJi1uPs_1x5kcRbh8M8XJSNMA').then((address) => {
  console.log(address)
})

```