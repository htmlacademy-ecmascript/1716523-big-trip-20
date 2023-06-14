import dayjs from 'dayjs';
import { SortType } from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

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

function createUniqIdAcc () {
  let uniqId = 1;
  return function () {
    return uniqId++;
  };
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createUniqId (min, max) {
  const uniqIdArr = [];
  return function() {
    while(uniqIdArr.length < max) {
      const currentValue = getRandomInteger(min, max);
      if (!uniqIdArr.includes(currentValue)) {
        uniqIdArr.push(currentValue);
        return currentValue;
      }
    }
  };
}

const filterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const filter = {
  [filterType.EVERYTHING]: (points) => [...points],
  [filterType.FUTURE]:(points) => points.filter((point) => isPointFuture(point)),
  [filterType.PRESENT]:(points) => points.filter((point) => isPointPresent(point)),
  [filterType.PAST]:(points) => points.filter((point) => isPointPast(point)),
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

// function updateItem(items, update) {
//   return items.map((item) => item.id === update.id ? update : item);
// }

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


export {getRandomArrayElement, editEventsDate, getRandomNumber,
  editEventsTime, createUniqId, getRandomInteger, editFullDate,
  createUniqIdAcc, filter, eventsSort, filterType};
