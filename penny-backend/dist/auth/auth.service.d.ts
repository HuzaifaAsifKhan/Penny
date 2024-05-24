import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './entities/user.repository';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: UserRepository);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    logIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        token: string;
    }>;
}
