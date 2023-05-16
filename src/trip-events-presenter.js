import { render, replace } from './framework/render';
import TripEventsListView from './view/trip-events-list-view';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';
import PhotoeTemplate from './view/photo-view';
import PhotoesContainer from './view/event-photoes-container-view';

export default class TripEventsListPresenter {
  #tripEventsList = new TripEventsListView();
  #tripEditEventItem = new TripEventsEditItemView();
  #photoesContainer = new PhotoesContainer();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.offers = [...this.pointsModel.offers];
    this.destinations = [...this.pointsModel.destinations];
    this.points = [...this.pointsModel.points];
  }

  // init() {

  //   render (this.#tripEventsList, this.listContainer);
  //   for (let i = 0; i < this.points.length; i++) {
  //     if (i === 0) {
  //       const currentOffer = this.offers.find((offer) => offer.type === this.points[i].type);
  //       const editItemComponent = new TripEventsEditItemView({point: this.points[i]}, {...currentOffer}, {...this.destinations[i]});
  //       render (editItemComponent, this.#tripEventsList.element);
  //     } else {
  //       const currentOffer = this.offers.find((offer) => offer.type === this.points[i].type);
  //       const itemComponent = new TripEventsItemView({point: this.points[i]}, {...currentOffer}, {...this.destinations[i]});
  //       render (itemComponent, this.#tripEventsList.element);
  //     }
  //   }
  //   render (new PhotoeTemplate(...this.destinations), this.#photoesContainer.element);
  // }

  init() {

    // openFormButton.addEventListener('click', console.log('pizda'));

    console.log(this.points, 'fff')

    render (this.#tripEventsList, this.listContainer);
    for (let i = 0; i < this.points.length; i++) {
      const currentOffer = this.offers.find((offer) => offer.type === this.points[i].type);
      const editItemComponent = new TripEventsEditItemView({point: this.points[i]}, {...currentOffer}, {...this.destinations[i]});
      const itemComponent = new TripEventsItemView({point: this.points[i]}, {...currentOffer}, {...this.destinations[i]});
      render (itemComponent, this.#tripEventsList.element);
      // console.log(itemComponent.openFormButton, 'zalupa')
      // itemComponent.openFormButton.addEventListener('click', console.log('pizdec'));
    }
    render (new PhotoeTemplate(...this.destinations), this.#photoesContainer.element);
  }
  // init() {

  //   render (this.#tripEventsList, this.listContainer);
  //   for (let i = 0; i < this.points.length; i++) {
  //     const currentOffer = this.offers.find((offer) => offer.type === this.points[i].type);
  //     const itemComponent = new TripEventsItemView(({point: this.points[i]}, {...currentOffer}, {...this.destinations[i]}));
  //     console.log(itemComponent, 'dddd')
  //     const editItemComponent = new TripEventsEditItemView(({point: this.points[i]}, {...currentOffer}, {...this.destinations[i]}));
  //     render (itemComponent, this.#tripEventsList.element);
  //   }
  //   render (new PhotoeTemplate(...this.destinations), this.#photoesContainer.element);
  // }

  // initEditItem() {

  // const escKeyDownHandler = (evt) => {
  //   if (evt.key === 'Escape') {
  //     evt.preventDefault();
  //     replaceFormToCard();
  //     document.removeEventListener('keydown', escKeyDownHandler);
  //   }
  // };

  //   const onFormSubmit = () => {
  //     replaceFormToCard();
  //     document.removeEventListener('keydown', escKeyDownHandler);
  //   };

  //   const onEditClick = () => {
  //     replaceCardToForm();
  //     document.addEventListener('keydown', escKeyDownHandler);
  //   };

  // function replaceCardToForm() {
  //   replace(editItemComponent, itemComponent);
  // }

  //   function replaceFormToCard() {
  //     replace(itemComponent, editItemComponent);
  //   }

  //   // render (editItemComponent, this.#tripEventsList.element);
  //   render (itemComponent, this.#tripEventsList.element);
  // }

}
