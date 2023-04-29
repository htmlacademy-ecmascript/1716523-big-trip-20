import { render } from './render';
import TripEventsListView from './view/trip-events-list-view';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';

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
