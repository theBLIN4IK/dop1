import { model, Schema } from 'mongoose';

const membersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    episode: {
        type: String,
        required: true,
    }
})

const membersModel = model('Member', membersSchema)

export default membersModel