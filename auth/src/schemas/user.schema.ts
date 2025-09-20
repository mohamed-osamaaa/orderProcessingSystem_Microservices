import { Schema } from 'mongoose';
import { UserRoles } from 'src/enums/userRoles.enum';

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: UserRoles,
        default: UserRoles.USER,
    },
}, {
    timestamps: true,
});
