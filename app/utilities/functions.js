import moment from 'moment';

export function isExpired(endDate) {
  const diff = moment.duration(moment().diff(endDate)).asDays();
  console.log(parseInt(diff));
  return diff < 0;
}

export function filterList(name, memebersList) {
  name = name.toLowerCase();
  let filtredList = memebersList.filter(function (element) {
    let ElementsName = element.fullName.toLocaleLowerCase();
    return ElementsName.includes(name);
  });

  return filtredList;
}

export function calculateActiveMemners(memebersList) {
  var counter = 0;
  memebersList.forEach((element) => {
    if (isExpired(element.subscription.end_date)) {
      counter++;
    }
  });

  console.log(memebersList);

  return counter;
}
