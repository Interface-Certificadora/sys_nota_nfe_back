import { LoginGuard } from './login.guard';
import { JwtService } from '@nestjs/jwt';

describe('LoginGuard', () => {
  const jwtService = new JwtService();

  it('should be defined', () => {
    expect(new LoginGuard(jwtService)).toBeDefined();
  });
});
