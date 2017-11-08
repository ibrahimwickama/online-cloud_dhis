import { TestBed, inject } from '@angular/core/testing';

import { ManifestServiceService } from './manifest-service.service';

describe('ManifestServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManifestServiceService]
    });
  });

  it('should be created', inject([ManifestServiceService], (service: ManifestServiceService) => {
    expect(service).toBeTruthy();
  }));
});
