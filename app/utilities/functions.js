import moment from 'moment';

export function isExpired(endDate) {
  const diff = moment.duration(moment().diff(endDate)).asDays();
  console.log(parseInt(diff));
  return diff < 0;
}
