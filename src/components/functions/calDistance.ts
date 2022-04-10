interface Props {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  style?: Object;
}

export default function CalDistance({ lat1, lon1, lat2, lon2, style }: Props) {
  const userLat = lat1;
  const userLon = lon1;
  const myLat = lat2;
  const myLon = lon2;

  const R = 6371;

  function toRad(value: number) {
    return (value * Math.PI) / 180;
  }

  const diffLat = toRad(userLat - myLat);
  const diffLon = toRad(userLon - myLon);

  const a =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.sin(diffLon / 2) *
      Math.sin(diffLon / 2) *
      Math.cos(userLat) *
      Math.cos(myLat);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  const roundPoint = d > 1 ? 1 : 2;
  const roundD: number = Number(d.toFixed(roundPoint));
  const distanceText: string =
    roundD >= 1 ? `${roundD} km` : `${roundD * 1000} m`;

  return { roundD, distanceText };
}
