import { UserRoles } from 'src/enums/userRoles.enum';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: UserRoles;
    createdAt?: Date;
    updatedAt?: Date;
}
