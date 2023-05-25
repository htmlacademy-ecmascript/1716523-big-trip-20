
import AbstractView from '../framework/view/abstract-view';
import { editEventsDate, editEventsTime } from '../utils';

function createTripEventsItemTemplate (event, offerObj, destination) {
  const dateFrom = event.dateFrom;
  const dateTo = event.dateTo;
  const editedDate = editEventsDate(dateFrom);
  const editedTimeFrom = editEventsTime(dateFrom);
  const editedTimeTo = editEventsTime(dateTo);
  const basePrice = event.basePrice;
  const eventType = event.type.toLowerCase();
  const city = destination.name;
  const isFavorite = event.isFavorite;


  function createOfferTemplate(offers) {
    return offers.map((offer) =>
      `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');
  }

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${editedDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${eventType} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${editedTimeFrom}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${editedTimeTo}</time>
      </p>
      <p class="event__duration">30M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${ createOfferTemplate(offerObj.offers)}
    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
}

export default class TripEventsItemView extends AbstractView {

  handleEditClick = null;
  favoriteButton = null;

  constructor(event, offer, destination, onEditClick, onFavoriteToggle) {
    super();
    this.event = event;
    this.offer = offer;
    this.destination = destination;
    this.handleEditClick = onEditClick;
    this.handleToggleFavorite = onFavoriteToggle;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.editClickHandler);
    this.favoriteButton = this.element.querySelector('.event__favorite-btn');
    this.favoriteButton.addEventListener('click',this.toggleFavoriteHandler);
  }

  get template () {
    return createTripEventsItemTemplate (this.event, this.offer, this.destination);
  }

  editClickHandler = (evt) => {
    evt.preventDefault();
    this.handleEditClick(this.element);
  };

  toggleFavoriteHandler = (evt) => {
    evt.preventDefault();
    console.log(this.element, 'ggg')
    this.handleToggleFavorite(this.element);
    // if (this.favoriteButton.classList.contains('event__favorite-btn--active')) {
    //   this.favoriteButton.classList.remove('event__favorite-btn--active');
    // } else {
    //   this.favoriteButton.classList.add('event__favorite-btn--active');
    // }
  };
}
