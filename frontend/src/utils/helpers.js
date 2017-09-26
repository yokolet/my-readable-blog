const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function millisToDate (millis) {
  var date = new Date(millis)
  return months[date.getUTCMonth()] + ' ' +
              date.getUTCDate() + ', ' +
              date.getUTCFullYear();
}
