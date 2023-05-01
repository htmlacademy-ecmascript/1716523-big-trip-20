import {getRandomWayPoint} from '../mock/way-points.js';

const POINTS_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomWayPoint);

  getPoints() {
    return this.points;
  }
}
