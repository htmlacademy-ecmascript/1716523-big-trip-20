// import { render } from './render';
// import TripEventsListView from './view/trip-events-list-view';
// import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
// import TripEventsItemView from './view/trip-events-item-view.js';
// import PhotoesContainer from './view/event-photoes-container-view';
// import PhotoeTemplate from './view/photo-view';


// export default class TripEditEventPresenter {
//   photoesContainer = new PhotoesContainer();

//   constructor({listContainer, pointsModel}) {
//     this.listContainer = listContainer;
//     this.pointsModel = pointsModel;
//     this.offers = [...this.pointsModel.getOffers()];
//     this.destinations = [...this.pointsModel.getDestinations()];
//     this.points = [...this.pointsModel.getPoints()];
//   }

//   init() {
//     console.log(this.listContainer, 'lll')
//     render (new PhotoeTemplate(...this.destinations), this.listContainer);
//   }
// }
