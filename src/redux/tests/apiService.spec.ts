import { apiService } from '../apiService';
import '@testing-library/jest-dom';

describe('apiService', () => {
  it('should be defined', () => {
    expect(apiService).toBeDefined();
  });

  describe('endpoints', () => {
    it('should include getAllRequestedResults', () => {
      expect(apiService.endpoints.getAllRequestedResults).toBeDefined();
      expect(
        apiService.endpoints.getAllRequestedResults.matchFulfilled
      ).toBeDefined();
    });

    it('should include getCategories', () => {
      expect(apiService.endpoints.getCategories).toBeDefined();
      expect(apiService.endpoints.getCategories.matchFulfilled).toBeDefined();
    });

    it('should include getDetailsById', () => {
      expect(apiService.endpoints.getDetailsById).toBeDefined();
      expect(apiService.endpoints.getDetailsById.matchFulfilled).toBeDefined();
    });
  });
});
