import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();

        res.status(200).json({ success: true, data: users });
    }catch(error){
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');

        if (!user){
            const error= new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: user });
    }catch(error){
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            ...req.body,
        })

        if(!updatedUser){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        };

        res.status(200).json({ success: true, data: updatedUser });
    }catch(e){
        next(e);
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            const error = new Error('User not found.');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: deletedUser });
    }catch(e){
        next(e);
    }
}