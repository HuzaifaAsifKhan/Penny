import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    private jwtService;
    constructor(dataSource: DataSource, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    logIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        username: string;
        token: string;
    }>;
}
