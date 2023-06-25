import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { SortType } from './const';

dayjs.extend(duration);

const MSEC_IN_HOUR = 3600000;
const MSEC_IN_DAY = 86400000;
const DESTINATIONS_TITLE_LENGTH = 3;

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'hh:mm';

const FULL_DATE_FORMAT = 'DD/MM/YY hh:mm';

function editFullDate (eventsDate) {
  return dayjs(eventsDate).format(FULL_DATE_FORMAT);
}

function editEventsDate (eventsDate) {
  return dayjs(eventsDate).format(DATE_FORMAT);
}
function editEventsTime (eventsDate) {
  return dayjs(eventsDate).format(TIME_FORMAT);
}

function getPointDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true) {
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[d] HH[h] mm[m]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[h] mm[m]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[m]');
      break;
  }

  return pointDuration;
}

function isPeriodCorrect (startDate, endDate) {
  return startDate <= endDate;
}

function isEventStateCorrect ({destination, dateFrom, dateTo, basePrice}) {
  return destination && basePrice && dateFrom && dateTo && isPeriodCorrect(dateFrom.getTime(), dateTo.getTime());
}

const filterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const filter = {
  [filterType.EVERYTHING]: (points) => [...points],
  [filterType.FUTURE]:(points) => [...points].filter((point) => isPointFuture(point)),
  [filterType.PRESENT]:(points) => [...points].filter((point) => isPointPresent(point)),
  [filterType.PAST]:(points) => [...points].filter((point) => isPointPast(point)),
};

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPointPresent(point) {
  return dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

const eventsSort = {
  [SortType.DAY]: (points) => points.slice(0).sort((a, b) => dayjs(a.dateFrom).toDate() - dayjs(b.dateFrom).toDate()),
  [SortType.PRICE]: (points) => points.slice(0).sort((a, b) => a.basePrice - b.basePrice),
  [SortType.TIME]: (points) => points.slice(0).sort((a, b) => (dayjs(a.dateFrom).diff(dayjs(a.dateTo), 'month')) - (dayjs(b.dateFrom).diff(dayjs(b.dateTo), 'month'))),
  [SortType.EVENT]: () => {
    throw new Error('sort is not implemented');
  } ,
  [SortType.OFFERS]: () => {
    throw new Error('sort is not implemented');
  },
};


function getTripInfoDestinations (points, destinations) {
  const destinationNames = points.map((point) =>
    destinations.find((el) => point.destination === el.id).name);

  return destinationNames.length <= DESTINATIONS_TITLE_LENGTH ? destinationNames.join('&nbsp;&mdash;&nbsp') :
    `${destinationNames.at(0)}'&nbsp;&mdash;&nbsp'...'&nbsp;&mdash;&nbsp'${destinationNames.at(-1)}`;
}

function getTripInfoDates(points) {
  const pointsDatesFrom = points.map((point) => editEventsDate(point.dateFrom));

  return `${pointsDatesFrom.at(0)}&nbsp;&mdash;&nbsp;${pointsDatesFrom.at(-1)}`;
}

function getTripInfoCost (points) {
  let totalPrice = 0;
  points.forEach((point) => {
    totalPrice += Number(point.basePrice);
  });
  return totalPrice;
}

function getPointsTotalCost (points, offers) {
  let totalSum = 0;
  points.forEach((point) => {
    totalSum += getPointOffersSum(point, offers);
  });
  return totalSum;
}

function getPointOffersSum(point, offers) {
  const currentOffersType = offers.find((offer) => point.type === offer.type);
  const choosenOffersObj = point.offers.map((id) => currentOffersType.offers.find((el) => id === el.id));
  let offersSum = 0;
  choosenOffersObj.forEach((el) => {
    offersSum += Number(el.price);
  });
  return offersSum;
}

export {
  editEventsDate,
  isPeriodCorrect,
  editEventsTime,
  editFullDate,
  filter,
  eventsSort,
  filterType,
  getPointDuration,
  getTripInfoDestinations,
  isEventStateCorrect,
  getTripInfoCost,
  getPointsTotalCost,
  getTripInfoDates };
