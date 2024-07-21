const { composeAddressFromDetailsNew } = require("./composeAddressFromDetailsNew")

const response = {
	"id": "ChIJu46S-ZZhLxMROG5lkwZ3D7k",
	"types": [
		"locality",
		"political"
	],
	"formattedAddress": "Rome, Metropolitan City of Rome Capital, Italy",
	"addressComponents": [
		{
			"longText": "Rome",
			"shortText": "Rome",
			"types": [
				"locality",
				"political"
			],
			"languageCode": "en"
		},
		{
			"longText": "Rome",
			"shortText": "Rome",
			"types": [
				"administrative_area_level_3",
				"political"
			],
			"languageCode": "en"
		},
		{
			"longText": "Metropolitan City of Rome Capital",
			"shortText": "RM",
			"types": [
				"administrative_area_level_2",
				"political"
			],
			"languageCode": "en"
		},
		{
			"longText": "Lazio",
			"shortText": "Lazio",
			"types": [
				"administrative_area_level_1",
				"political"
			],
			"languageCode": "en"
		},
		{
			"longText": "Italy",
			"shortText": "IT",
			"types": [
				"country",
				"political"
			],
			"languageCode": "en"
		}
	],
	"location": {
		"latitude": 41.8967068,
		"longitude": 12.4822025
	},
	"displayName": {
		"text": "Rome",
		"languageCode": "en"
	}
};

const response2 = {
	"id": "ChIJ9d3F7KCNJRMRHzj5DqppxZs",
	"types": [
		"premise"
	],
	"formattedAddress": "Via S. Marco Argentano, 48, 00128 Roma RM, Italy",
	"addressComponents": [
		{
			"longText": "48",
			"shortText": "48",
			"types": [
				"street_number"
			],
			"languageCode": "en-US"
		},
		{
			"longText": "Via San Marco Argentano",
			"shortText": "Via S. Marco Argentano",
			"types": [
				"route"
			],
			"languageCode": "it"
		},
		{
			"longText": "Roma",
			"shortText": "Roma",
			"types": [
				"locality",
				"political"
			],
			"languageCode": "it"
		},
		{
			"longText": "Roma",
			"shortText": "Roma",
			"types": [
				"administrative_area_level_3",
				"political"
			],
			"languageCode": "it"
		},
		{
			"longText": "Città metropolitana di Roma Capitale",
			"shortText": "RM",
			"types": [
				"administrative_area_level_2",
				"political"
			],
			"languageCode": "it"
		},
		{
			"longText": "Lazio",
			"shortText": "Lazio",
			"types": [
				"administrative_area_level_1",
				"political"
			],
			"languageCode": "it"
		},
		{
			"longText": "Italy",
			"shortText": "IT",
			"types": [
				"country",
				"political"
			],
			"languageCode": "en"
		},
		{
			"longText": "00128",
			"shortText": "00128",
			"types": [
				"postal_code"
			],
			"languageCode": "en-US"
		}
	],
	"location": {
		"latitude": 41.734747,
		"longitude": 12.485411
	},
	"displayName": {
		"text": "Via S. Marco Argentano, 48"
	}
};

const address = composeAddressFromDetailsNew(response);

const address2 = composeAddressFromDetailsNew(response2);

describe('composeAddressFromDetailsNew', () => {
  it('should return an address object', () => {
    expect(address).toEqual({
      id: 'ChIJu46S-ZZhLxMROG5lkwZ3D7k',
      country: 'Italy',
      state: 'Lazio',
      city: 'Rome',
      street: '',
      number: '',
      zipCode: '',
      formattedAddress: 'Rome, Metropolitan City of Rome Capital, Italy',
      addressNote: '',
      coordinates: [41.8967068, 12.4822025]
    });
  });
  it('should return an address object', () => {
    expect(address2).toEqual({
      id: 'ChIJ9d3F7KCNJRMRHzj5DqppxZs',
      country: 'Italy',
      state: 'Lazio',
      city: 'Roma',
      street: 'Via San Marco Argentano',
      number: '48',
      zipCode: '00128',
      formattedAddress: 'Via S. Marco Argentano, 48, 00128 Roma RM, Italy',
      addressNote: '',
      coordinates: [41.734747, 12.485411]
    });
  });
});
