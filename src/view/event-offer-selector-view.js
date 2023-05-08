import { createElement } from '../render';

function createOfferSelectorTemplate(title, id, price) {

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
  <label class="event__offer-label" for="event-offer-meal-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
  </div>`;
}

export default class OffersSelector {
  constructor(title, id, price) {
    this.title = title;
    this.id = id;
    this.prie = price;
  }

  getTemplate() {
    return createOfferSelectorTemplate(this.title, this.id, this.price);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement (this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
