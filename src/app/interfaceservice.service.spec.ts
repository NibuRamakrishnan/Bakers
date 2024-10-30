import { TestBed } from '@angular/core/testing';

import { InterfaceserviceService } from './interfaceservice.service';

describe('InterfaceserviceService', () => {
  let service: InterfaceserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
