import firebase from 'firebase/compat';
import OrderByDirection = firebase.firestore.OrderByDirection;

export class FilterSettings {
  lowestPoint = 0;
  highestPoint = 0;
  duration = 0;
  orderBy = 'hikeId';
  orderMode: OrderByDirection = 'asc';
  showShared = true;
}
