import { render } from './render';
import TripEventsListView from './view/trip-events-list-view';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';

export default class TripEventsListPresenter {
  tripEventsList = new TripEventsListView();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.wayPoints = [...this.pointsModel.getPoints()];

    render (this.tripEventsList, this.listContainer);
    render (new TripEventsEditItemView, this.tripEventsList.getElement());
    for (let i = 0; i < this.wayPoints.length; i++) {
      render (new TripEventsItemView({point: this.wayPoints[i]}), this.tripEventsList.getElement());
    }
  }
}
