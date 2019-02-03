import { TestBed } from '@angular/core/testing';

import { FoodieRestService } from './foodie-rest.service';

describe('FoodieRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodieRestService = TestBed.get(FoodieRestService);
    expect(service).toBeTruthy();
  });
});
