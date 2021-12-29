import LocationAddress from '../models/location-address.model';
import HikeLocation from '../models/hike-location.model';
import Author from '../models/author.model';
import HikeStats from '../models/hike-stats.model';
import Picture from '../models/picture.model';
import Hike from '../models/hike.model';

const address1: LocationAddress = {
  street: 'Irgendeine Straße 123',
  zip: 3000,
  city: 'Irgendwo'};

/*

const hikeLocation: HikeLocation = {address1, '47.7170965,14.0554717'};
const author1 = new Author('Fritz Fantom', 'avatar.png');
const hikeStats = new HikeStats('1.234m', '4.321m', new Date(0, 0, 0, 3, 40));

const schiederweier = new Picture('schiederweier.jpg', 'Schiederweier');
const oetscher = new Picture('oetscher.jpg', 'Ötscher');
const pictureCollection = [schiederweier, oetscher, schiederweier, schiederweier, oetscher, oetscher];

const hike1 = new Hike(
  '1',
  'Hike 1',
  'Das ist irgendeine wunderbare Wanderung',
  `<p>Die Wanderung geht vom Tal auf den Berg, dann wieder runter.</p>
                <p>Es ist wirklich toll, diese Aussicht irgendwohin.</p>`,
  author1,
  hikeLocation,
  hikeStats,
  pictureCollection
);

const hike2 = new Hike(
  '2',
  'Hike 2',
  'Das ist irgendeine zweite wunderbare Wanderung',
  `<p>Die Wanderung geht wieder vom Tal auf den Berg, dann auch wieder runter.</p>
                <p>Es ist wirklich toll, diese Aussicht irgendwohin wiederzusehen.</p>`,
  author1,
  hikeLocation,
  hikeStats,
  pictureCollection
);
*/
export const HIKES: Hike[] = [];
