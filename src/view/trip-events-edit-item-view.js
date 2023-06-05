
import { editFullDate } from '../utils';
import AbstractStateFulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

let offersIds = [];

function createTripEventsEditItemTemplate ({state, offerObj, destinations}) {
  const {point} = state;

  const destination =
    destinations.find((el) => point.destination === el.id);


  const dateFrom = point.dateFrom;
  const dateTo = point.dateTo;
  const editedFullDateFrom = editFullDate(dateFrom);
  const editedFullDateTo = editFullDate(dateTo);
  const basePrice = point.basePrice;
  const eventType = point.type;
  const city = destination.name;
  const isChecked = point.isChecked;


  function createPhotoeTemplate (photoes) {
    return photoes.map((photo) =>`<img class="event__photo" src="${photo.src}" alt="event photo">`).join('') ;
  }

  function createOfferTemplate(offers) {
    return offers.map((offer) =>
      `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox"
         name="event-offer-${eventType}"
         >
         <label class="event__offer-label" for="event-offer-${eventType}-${offer.id}">
           <span class="event__offer-title">${offer.title}</span>
           &plus;&euro;&nbsp;
           <span class="event__offer-price">${offer.price}</span>
         </label>
       </div>`).join('');
  }

  function getOffersTemplate() {
    let offerTabletTemplate = '';
    offerObj.forEach((offer) => {
      if (offer.type.toLowerCase() === point.type.toLowerCase()) {
        offerTabletTemplate += createOfferTemplate(offer.offers);
      }
    });
    return offerTabletTemplate;
  }

  function getOffersTypeSelectTemplate() {
    let selectTypeTemplate = '';
    offerObj.forEach(({ type }) => {
      selectTypeTemplate += `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1"
      class="event__type-input  visually-hidden"
      type="radio" name="event-type"
      value="${type.toLowerCase()}"
      ${isChecked ? 'checked' : ''}>
      <label class="event__type-label
      event__type-label--${type.toLowerCase()}"
      for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`;
    });
    return selectTypeTemplate;
  }

  function getSelectDestinationsTemplate() {
    let selectDestinationTemplate = '';
    destinations.forEach((dest) => {
      selectDestinationTemplate += `<option value="${dest.name}"></option>`;
    });
    return selectDestinationTemplate;
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
              ${getOffersTypeSelectTemplate()}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${eventType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="select" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${getSelectDestinationsTemplate()}
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
        ${getOffersTemplate()}

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
  datepicker = null;


  constructor({point, offer, destinations}, onFormSubmit, onFormClose, onFormReset) {
    super();
    this._setState(TripEventsEditItemView.parseEventToState({point}));

    this.event = point;
    this.offer = offer;
    this.destinations = destinations;
    this.handleFormSubmit = onFormSubmit;
    this.handleFormReset = onFormReset;
    this.handleFormClose = onFormClose;
    this._restoreHandlers();
  }

  get template () {
    return createTripEventsEditItemTemplate ({
      state:this._state,
      offerObj:this.offer,
      destinations:this.destinations,
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.submitFormHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.closeFormHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('reset', this.resetFormHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.chooseTypeFormHandler);
    this.element.querySelector('.event__available-offers').addEventListener('click', this.chooseOffersHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.changePriceHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.changeDestinationHandler);
    this.setDateFromPicker();
    this.setDateToPicker();
  }

  changeDestinationHandler = (evt) => {
    evt.preventDefault();
    const changedDestinationId = this.destinations.find((destination) =>evt.target.value === destination.name).id;
    this.updateElement({
      point:{
        ...this._state.point,
        destination: changedDestinationId,
      }
    });
  };

  removeElement() {
    super.removeElement();

    if (this.datepicker) {
      this.datepicker.destroy();
      this.datepicker = null;
    }
  }

  #dateFromChangeHandler = ([userDateFrom]) => {
    this._setState({
      point:{
        ...this._state.point,
        dateFrom: userDateFrom,
      }
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDateTo,
      }
    });
  };

  setDateFromPicker() {
    this.datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'), {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  setDateToPicker() {
    this.datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'), {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      }
    );
  }

  changePriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      point: {
        ...this._state.point,
        basePrice: parseInt(evt.target.value, 10)
      }
    });
  };

  chooseOffersHandler = (evt) => {
    evt.preventDefault();
    let inputTarget;
    if (evt.target.tagName.toLowerCase() === 'span') {
      inputTarget = evt.target.parentElement.previousElementSibling;
    } else {
      inputTarget = evt.target.previousElementSibling;
    }

    if (offersIds.includes(inputTarget.id)) {
      const result = offersIds.filter((el) => el !== inputTarget.id);
      offersIds = result;
    } else {
      offersIds.push(inputTarget.id);
    }

    if(inputTarget.hasAttribute('checked')) {
      inputTarget.removeAttribute('checked');
    } else{
      inputTarget.setAttribute('checked', true);
    }

    this._setState({
      point: {
        ...this._state.point,
        selectedOffersIds: offersIds,
      }
    });
  };

  submitFormHandler = (evt) => {
    evt.preventDefault();
    this.handleFormSubmit(TripEventsEditItemView.parseEventToState(this._state));
  };

  closeFormHandler = (evt) => {
    evt.preventDefault();
    this.handleFormClose();
  };

  reset = (point) => {
    this.updateElement(TripEventsEditItemView.parseEventToState({point}));
  };

  resetFormHandler = (evt) => {
    evt.preventDefault();
    this.handleFormReset(this.element);
  };

  chooseTypeFormHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers:  [],
        isChecked: true,
      }
    });
  };

  static parseEventToState = ({point}) => ({point});

  static parseStateToEvent = (state) => state.point;

}
export {createTripEventsEditItemTemplate};
