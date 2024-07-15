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

## Parameters

- `addressComponents` (Array): An array of address components obtained from a geocoding service.
- `location` ({ lat: number, lng: number }): The geographic coordinates (latitude and longitude) of the place.
- `id` (string): A unique identifier for the place.
- `formattedAddress` (string): Full address
- `types` (array): current place types array
- `displayName` (string): place name

## Return Value

The function returns an `Address`

```javascript
// All this fields returned with new version of https://developers.google.com/maps/documentation/places/web-service/place-details
type ComposeAddressFromDetailsNewArg = {|
  addressComponents: Array<AddressComponent>,
  location: { lat: number, lng: number },
  id: string, // placeId
  formattedAddress: string,
  types: Array<string>,
  displayName: string,
|}

/**
 * Compose an Address object from detailed address components and location.
 * @param {ComposeAddressFromDetailsNewArg} params - The input parameters object.
 * @returns {Address} - The composed address object.
 */

const composeAddressFromDetailsNew = ({ addressComponents, location, id, formattedAddress, types, display }: ComposeAddressFromDetailsNewArg): Address

```

## Usage

### Example usage of `composeAddressFromDetailsNew`:

```javascript
const getPlaceDetailsNewResponse = {
    id: "ChIJi1uPs_1x5kcRbh8M8XJSNMA",
    types: [
        "city_hall",
        "tourist_attraction",
        "local_government_office",
        "point_of_interest",
        "establishment"
    ],
    formattedAddress: "75004 Paris, France",
    addressComponents: [
        {
            longText: "Paris",
            shortText: "Paris",
            types: [
                "locality",
                "political"
            ],
            languageCode: "en"
        },
        {
            longText: "Paris",
            shortText: "Paris",
            types: [
                "administrative_area_level_2",
                "political"
            ],
            languageCode: "en"
        },
        {
            longText: "Île-de-France",
            shortText: "IDF",
            types: [
                "administrative_area_level_1",
                "political"
            ],
            languageCode: "en"
        },
        {
            longText: "France",
            shortText: "FR",
            types: [
                "country",
                "political"
            ],
            languageCode: "en"
        },
        {
            longText: "75004",
            shortText: "75004",
            types: [
                "postal_code"
            ],
            languageCode: "en-US"
        }
    ],
    location: {
        latitude: 48.8564826,
        longitude: 2.3524135
    }
}

const address: Address = composeAddressFromDetailsNew(...getPlaceDetailsNewResponse);
console.log(address);
```

# The `placesAutocompleteNew` function:

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