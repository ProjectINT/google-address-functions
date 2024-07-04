# google-address-functions
functions for google places

## Installation

```
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

```
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
