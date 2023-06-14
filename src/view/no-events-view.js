import AbstractView from '../framework/view/abstract-view';
import { NoEventsTexts } from '../const';


function createNoEventsTemplate(textType) {
  return ` <section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>

  <p class="trip-events__msg">${NoEventsTexts[textType]}</p>

</section>`;
}


export default class NoEvents extends AbstractView {
  filterTypeText = null;

  constructor(type) {
    super();
    this.filterTypeText = type;
  }

  get template() {
    return createNoEventsTemplate(this.filterTypeText);
  }
}
