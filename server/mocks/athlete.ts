//  curl -X GET \
// https://www.strava.com/api/v3/athlete \
// -H 'Authorization: Bearer 123'

import type { Athlete } from '../src/types.js'

export const athleteMock: Athlete = {
  id: 2372442,
  username: "mschnoor",
  resource_state: 2,
  firstname: "Mathieu",
  lastname: "Schnoor",
  bio: "",
  city: "Antibes",
  state: "",
  country: "France",
  sex: "M",
  premium: false,
  summit: false,
  created_at: "2013-06-18T09:48:15Z",
  updated_at: "2026-02-22T09:39:18Z",
  badge_type_id: 0,
  weight: 71.0,
  profile_medium:
    "https://dgalywyr863hv.cloudfront.net/pictures/athletes/2372442/3403379/5/medium.jpg",
  profile:
    "https://dgalywyr863hv.cloudfront.net/pictures/athletes/2372442/3403379/5/large.jpg",
  friend: null,
  follower: null,
};
