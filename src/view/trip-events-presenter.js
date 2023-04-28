import { render } from '../render';
import TripEventsListView from './trip-events-list-view.js';
import TripEventsEditItemView from './trip-events-edit-item-view.js';
import TripEventsItemView from './trip-events-item-view.js';

export default class TripEventsListPresenter {
  tripEventsList = new TripEventsListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render (this.tripEventsList, this.listContainer);
    render (new TripEventsEditItemView, this.tripEventsList.getElement());
    for (let i = 0; i < 3; i++) {
      render (new TripEventsItemView, this.tripEventsList.getElement());
    }
  }
}
