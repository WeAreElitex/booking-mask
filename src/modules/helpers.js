// @flow
/**
 * Helper functions
 * @module Helpers
 */

/**
 * Convert data attributes to Object
 * @param {Element} elem
 * @returns {{}}
 */
export function datasetToObject(elem: Element): Object {
  const data = {};
  [].forEach.call(elem.attributes, attr => {
    /* istanbul ignore else */
    if (/^data-/.test(attr.name)) {
      const camelCaseName = attr.name.substr(5).replace(/-(.)/g, ($0, $1) => $1.toUpperCase());
      data[camelCaseName] = attr.value;
    }
  });
  return data;
}

/**
 * Construct the url basing on booking object and prefix
 * @param {Object} booking – `booking` state field object
 * @param {String} prefix - URL base
 * @param {String} [postFix] - URL ending
 * @returns {String}
 */
export function constructUrlFromBooking(
  booking: Object,
  prefix: string,
  postFix: string = '',
): string {
  const passangers = `adults-${booking.passangers.adults}/children-${
    booking.passangers.children
  }/infants-${booking.passangers.infants}`;
  const outboundFlight = `${booking.from}-${booking.to}/from-${booking.flightDates.departure}`;
  const returnFlight =
    booking.isRoundTrip && booking.flightDates.return
      ? `/Return/${booking.to}-${booking.from}/from-${booking.flightDates.return}`
      : '';

  return `${prefix}/Outbound/${outboundFlight}${returnFlight}/${passangers}/${postFix}`;
}
