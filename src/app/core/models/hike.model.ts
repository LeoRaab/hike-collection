import Picture from './picture.model';
import HikeLocation from './hike-location.model';
import HikeStats from './hike-stats.model';

export default interface Hike {
  hikeId: string;
  userId: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  location: HikeLocation;
  stats: HikeStats;
  pictureCollection: Picture[];
}
