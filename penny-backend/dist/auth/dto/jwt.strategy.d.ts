import { UserRepository } from '../entities/user.repository';
import { IJwtPayload } from './jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    jwtConfig: any;
    constructor(userRepository: UserRepository);
    validate(payload: IJwtPayload): Promise<import("../entities/user.entity").User>;
}
export {};
