import { Router } from 'express'
import authorize from '../middlewares/auth.middleware.js'
import { cancelSubscription, createSubscription, deleteSubscription, getSubscriptions, getUpcomingRenewals, getUserSubscriptions, updateSubscriptions } from '../controllers/subscription.controller.js'

const subscriptionRouter = Router()

subscriptionRouter.get('/', authorize, getSubscriptions)

//subscriptionRouter.get('/:id', getSubscriptionsId)

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', authorize, updateSubscriptions)

subscriptionRouter.delete('/:id', authorize, deleteSubscription)

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/user/:id/cancel', authorize, cancelSubscription)

subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals)

export default subscriptionRouter