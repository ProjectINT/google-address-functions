// @flow strict

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

type PlacePrediction = {
  text: {
    text: string,
  },
  placeId: string,
};

type AddressComponent = {
  types: Array<string>,
  long_name: string,
  short_name: string,
}

type AddressComponentNew = {
  types: Array<string>,
  longText: string,
  shortText: string,
}

type Place = {
  address_components: Array<AddressComponent>,
  formatted_address?: string,
  geometry?: {
    location: {
      lat: () => number,
      lng: () => number,
    },
    viewport: {
      northeast: { lat: number, lng: number },
      southwest: { lat: number, lng: number },
    },
  },
  name: string,
  types: Array<string>,
}

type PlaceDetails = {
  html_attributions: Array<string>,
  result: Place,
  status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR',
};
