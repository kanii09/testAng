import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  // Simplified executeGuard without parameters
  const executeGuard = () => TestBed.runInInjectionContext(() => authGuard(null as any, null as any));

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should allow navigation when logged in', () => {
    authServiceMock.isLoggedIn.and.returnValue(true);
    expect(executeGuard()).toBeTrue();
  });

  it('should block navigation and redirect when not logged in', () => {
    authServiceMock.isLoggedIn.and.returnValue(false);
    executeGuard();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
