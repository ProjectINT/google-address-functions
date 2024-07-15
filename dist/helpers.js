const {
  placesTypes
} = require('./placesTypes');
module.exports.getPlaceName = ({
  types,
  displayName
}) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const type of types) {
    if (placesTypes.includes(type)) {
      return `${displayName} `;
    }
  }
  return '';
};
module.exports.getAddressComponentByType = (components, type) => {
  if (!Array.isArray(components)) return '';
  const component = components.find(({
    types
  }) => types.includes(type));
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