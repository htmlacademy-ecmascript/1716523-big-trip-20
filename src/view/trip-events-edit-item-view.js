
import { editFullDate } from '../utils';
// import AbstractView from '../framework/view/abstract-view';
import AbstractStateFulView from '../framework/view/abstract-stateful-view';

function createTripEventsEditItemTemplate ({point, offerObj, destination}) {
  const dateFrom = point.dateFrom;
  const dateTo = point.dateTo;
  const editedFullDateFrom = editFullDate(dateFrom);
  const editedFullDateTo = editFullDate(dateTo);
  const basePrice = point.basePrice;
  const eventType = point.type;
  const city = destination.name;


  function createPhotoeTemplate (photoes) {
    return photoes.map((photo) =>`<img class="event__photo" src="${photo.src}" alt="event photo">`).join('') ;
  }

  function createOfferTemplate(offers) {
    return offers.map((offer) =>
      `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${eventType}-${point.id}" type="checkbox"
         name="event-offer-${eventType}"
         ${offers.includes(offer.id) ? 'checked' : ''}>
         <label class="event__offer-label" for="event-offer-${eventType}-${point.id}">
           <span class="event__offer-title">${offer.title}</span>
           &plus;&euro;&nbsp;
           <span class="event__offer-price">${offer.price}</span>
         </label>
       </div>`).join('');
  }


  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${eventType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${editedFullDateFrom}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${editedFullDateTo}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offerObj.offers.length > 0 ? createOfferTemplate(offerObj.offers) : ''}
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
        <div class="event__photos-tape">
        ${destination ? createPhotoeTemplate(destination.pictures) : ''}
        </div>
      </div>
      </section>
    </section>
  </form>
</li>`);
}

export default class TripEventsEditItemView extends AbstractStateFulView {

  handleFormSubmit = null;

  constructor({point, offer, destination}, onFormSubmit, onFormClose, onFormReset) {
    super();
// console.log(point, 'zalupe')
    this._setState(TripEventsEditItemView.parseEventToState(point));

    this.event = point;
    this.offer = offer;
    this.destination = destination;
    this.handleFormSubmit = onFormSubmit;
    this.handleFormReset = onFormReset;
    this.handleFormClose = onFormClose;
    // this.element.querySelector('.event__save-btn').addEventListener('submit', this.submitFormHandler);
    // this.element.querySelector('.event__rollup-btn').addEventListener('click', this.closeFormHandler);
    // this.element.querySelector('.event__reset-btn').addEventListener('reset', this.resetFormHandler);
    // this.element.querySelector('.event__type-group').addEventListener('click', this.chooseTypeFormHandler);
    this._restoreHandlers();
    // console.log(this._state, 'ssss')

  }

  get template () {
    return createTripEventsEditItemTemplate ({
      point:this._state,
      offerObj:this.offer,
      destination:this.destination,
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event__save-btn').addEventListener('submit', this.submitFormHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.closeFormHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('reset', this.resetFormHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.chooseTypeFormHandler);
  }

  submitFormHandler = (evt) => {
    evt.preventDefault();
    this.handleFormSubmit(TripEventsEditItemView.parseStateToEvent(this._state));
  };

  closeFormHandler = (evt) => {
    evt.preventDefault();
    this.handleFormClose(TripEventsEditItemView.parseStateToEvent(this._state));
  };

  resetFormHandler = (evt) => {
    evt.preventDefault();
    this.handleFormReset(this.element);
  };

  chooseTypeFormHandler = (evt) => {
    this.updateElement({type: evt.target.textContent});
    // console.log(evt.target.textContent, 'target')
    // console.log(this._state, 'state')
    // console.log(this.point, 'point')
    // this._state.type = evt.target.value;
  };

  static parseEventToState = (point) => ({...point});

  static parseStateToEvent(state) {
    const point = {...state};
    return point;
  }


}
export {createTripEventsEditItemTemplate};
