import { os } from '@orpc/server'
import { athleteMock } from '../mocks/athlete.js'
import { activities } from '../mocks/activities.js'

export const athlete = os.handler(async () => {
  return athleteMock
})

export const getActivities = os.handler(async () => {
  return activities
})

export const router = {
  athlete,
  activities: getActivities,
}

export type AppRouter = typeof router
