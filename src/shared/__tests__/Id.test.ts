import { Id } from '../Id';
import { uuidRegExp } from '../const';

describe(Id.name, () => {
  describe(Id.create.name, () => {
    it('returns uuid', () => {
      // WHEN
      const result = Id.create();

      // THEN
      expect(result).toMatch(uuidRegExp);
    });
  });
});
