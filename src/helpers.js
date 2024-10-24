// @flow strict
const { placesTypes } = require('./placesTypes');

type PlaceNameArg = {|
  placeTypes: Array<string>,
  displayName: string,  
|};

module.exports.getPlaceName = ({placeTypes, displayName}: PlaceNameArg): string => {
  if (!Array.isArray(placeTypes)) return '';

  for (const placeType of placeTypes) {
    if (placesTypes.includes(placeType)) {
      return `${displayName} `;
    }
  }
  return '';
};

module.exports.getAddressComponentByType = (components: Array<AddressComponent>, type: string): string => {
  if (!Array.isArray(components)) return '';

  const component = components.find(({ types }) => types.includes(type));
  
  if (component) {
    if (component.long_name) {
      return component.long_name;
    }
    if (component.short_name) {
      return component.short_name;
    }
    return '';
  }
  return '';
};

module.exports.getAddressComponentByTypeNew = (components: Array<AddressComponentNew>, type: string): string => {
  if (!Array.isArray(components)) return '';

  const component = components.find(({ types }) => types.includes(type));
  
  if (component) {
    if (component.longText) {
      return component.longText;
    }
    if (component.shortText) {
      return component.shortText;
    }
    return '';
  }
  return '';
};

module.exports.v4 = (): string => {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d/16);
      return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
  });
};