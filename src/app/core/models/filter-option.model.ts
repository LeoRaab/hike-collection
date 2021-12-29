import firebase from 'firebase/compat';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export default class FilterOption {
  constructor(public value: string | number | boolean,
              public filterField: string,
              public operatorString: WhereFilterOp,
              public enabled: boolean = false) {
  }
}
