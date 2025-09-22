import {
    IsNotEmpty,
    IsString,
    Length,
} from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    readonly message: string;
}
