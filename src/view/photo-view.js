import { createElement } from '../render';

function createPhotoeTemplate (destination) {

  const photo = destination.pictures[0].src;

  return (`
    <img class="event__photo" src="${photo}">
  `);
}

export default class PhotoeTemplate {
  constructor(destination) {
    this.destination = destination;
  }

  getTemplate() {
    return createPhotoeTemplate(this.destination);
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
