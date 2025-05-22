import dayjs from "dayjs";
import { SERVER_URL } from "../env.js";
import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../upstash.js";

export const getSubscriptions = async (req, res, next) => {
    try{
        const subscriptions = await Subscription.find();

        res.status(200).json({ success: true, data: subscriptions });
    }catch(e){
        next(e);
    }
}

export const getSubscriptionsId = async (req, res, next) => {
    try{
        const subscriptionsId = await Subscription.find({ name: req.params.id});

        res.status(200).json({ success: true, data: subscriptionsId });
    }catch(e){
        next(e);
    }
}

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        console.log("created sub", SERVER_URL);

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })
        console.log("created workflow");
        res.status(201).json({ success: true, data: subscription, workflowRunId })
    } catch(e){
        next(e);
    }
}

export const updateSubscriptions = async (req, res, next) => {
    try{
        const subscriptionId = req.params.id;
        const existingSubscription = await Subscription.findById(subscriptionId);

        if(!existingSubscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        if(existingSubscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not the owner of this subscription');
            error.status = 403;
            throw error;
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            {
                ...req.body,
                user: req.user._id
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({success: true, data: updatedSubscription});
    }catch(e){
        next(e);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try{
        const subscriptionId = req.params.id;
        const existingSubscription = await Subscription.findById(subscriptionId);

        if(!existingSubscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        if(existingSubscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not the owner of this subscription');
            error.status = 403;
            throw error;
        }

        const deletedSubscription = await Subscription.findByIdAndDelete(subscriptionId);

        res.status(200).json({success: true, data: deletedSubscription});
    }catch(e){
        next(e);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        if(req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, data: subscriptions });
    } catch(e){
        next(e);
    }
}

export const cancelSubscription = async (req, res, next) => {
    try{
        const subscriptionId = req.params._id;
        const existingSubscription = await Subscription.findById(subscriptionId);

        if(!existingSubscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        if(existingSubscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not the owner of this subscription');
            error.status = 403;
            throw error;
        }

        const cancelledSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            {
                status: "cancelled"
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({success: true, data: cancelledSubscription});
    }catch(e){
        next(e);
    }
}

export const getUpcomingRenewals = async (req, res, next) => {
    try{
        const upcomingRenewals = await Subscription.findById(req.params.id, {
            renewalDate: {
                $gte: dayjs().startOf('day'),
                $lte: dayjs().add(7, 'day').endOf('day'),
            },
            status: 'active'
        })

        res.status(200).json({success: true, data: upcomingRenewals})
    }catch(e){
        next(e);
    }
}

