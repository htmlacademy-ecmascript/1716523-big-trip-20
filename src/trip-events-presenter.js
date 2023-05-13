import { render } from './render';
import TripEventsListView from './view/trip-events-list-view';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';
import PhotoeTemplate from './view/photo-view';
import PhotoesContainer from './view/event-photoes-container-view';
export default class TripEventsListPresenter {
  tripEventsList = new TripEventsListView();
  tripEditEventItem = new TripEventsEditItemView();
  photoesContainer = new PhotoesContainer();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.offers = [...this.pointsModel.getOffers()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.points = [...this.pointsModel.getPoints()];
  }

  init() {
    render (this.tripEventsList, this.listContainer);
    for (let i = 0; i < this.points.length; i++) {
      if (i === 0) {
        const currentOffer = this.offers.find((offer) => offer.type === this.points[i].type);
        render (new TripEventsEditItemView({point: this.points[i]}, {...currentOffer}, {...this.destinations[i]}), this.tripEventsList.getElement());
      } else {
        const currentOffer = this.offers.find((offer) => offer.type === this.points[i].type);
        render (new TripEventsItemView({point: this.points[i]}, {...currentOffer}, {...this.destinations[i]}), this.tripEventsList.getElement());
      }
    }
    render (new PhotoeTemplate(...this.destinations), this.photoesContainer.getElement());
  }

}
