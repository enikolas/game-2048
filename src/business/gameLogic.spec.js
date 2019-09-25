import 'core-js/es/array';
import {
  mapToRows,
  mapToColumns,

  moveRight,
  moveLeft,

  mergeRight,
  mergeLeft,

  spawnNewBoxFactory,
  isGameOver
} from './gameLogic';

describe('Game Logic', () => {
  describe('mapToRows', () => {
    it('Scenario [1,2,3,4]', () => {
      expect(mapToRows(
        [1,2,3,4]
      ).toString()).toEqual(
        [
          [1,2],
          [3,4]
        ].toString()
      );
    });
  });

  describe('mapToColumns', () => {
    it('Scenario [1,2,3,4]', () => {
      expect(mapToColumns(
        [1,2,3,4]
      ).toString()).toEqual(
        [
          [1,3],
          [2,4]
        ].toString()
      );
    });
  });

  describe('moveRight', () => {
    it('Scenario [2,0,0,0]', () => {
      expect(moveRight(
        [2,0,0,0]
      ).toString()).toEqual(
        [0,0,0,2].toString()
      );
    });

    it('Scenario [2,0,4,0]', () => {
      expect(moveRight(
        [2,0,4,0]
      ).toString()).toEqual(
        [0,0,2,4].toString()
      );
    });
  });

  describe('mergeRight', () => {
    it('Scenario [0,0,2,2]', () => {
      const addScore = jest.fn();
      
      expect(mergeRight(
        [0,0,2,2], addScore
      ).toString()).toEqual(
        [0,0,0,4].toString()
      );

      expect(addScore).toHaveBeenCalledWith(4);
    });

    it('Scenario [0,2,2,4]', () => {
      const addScore = jest.fn();

      expect(mergeRight(
        [0,2,2,4], addScore
      ).toString()).toEqual(
        [0,0,4,4].toString()
      );

      expect(addScore).toHaveBeenCalledWith(4);
    });

    it('Scenario [2,2,2,4]', () => {
      const addScore = jest.fn();

      expect(mergeRight(
        [2,2,2,4], addScore
      ).toString()).toEqual(
        [0,2,4,4].toString()
      );

      expect(addScore).toHaveBeenCalledWith(4);
    });

    it('Scenario [2,2,4,4]', () => {
      const addScore = jest.fn();

      expect(mergeRight(
        [2,2,4,4], addScore
      ).toString()).toEqual(
        [0,0,4,8].toString()
      );

      expect(addScore).toHaveBeenCalledWith(8);
      expect(addScore).toHaveBeenCalledWith(4);
    });
  });

  describe('moveLeft', () => {
    it('Scenario [0,0,0,2]', () => {
      expect(moveLeft(
        [0,0,0,2]
      ).toString()).toEqual(
        [2,0,0,0].toString()
      );
    });

    it('Scenario [0,4,0,2]', () => {
      expect(moveLeft(
        [0,4,0,2]
      ).toString()).toEqual(
        [4,2,0,0].toString()
      );
    });
  });

  describe('mergeLeft', () => {
    it('Scenario [2,2,0,0]', () => {
      const addScore = jest.fn();

      expect(mergeLeft(
        [2,2,0,0], addScore
      ).toString()).toEqual(
        [4,0,0,0].toString()
      );

      expect(addScore).toHaveBeenCalledWith(4);
    });

    it('Scenario [4,2,2,0]', () => {
      const addScore = jest.fn();

      expect(mergeLeft(
        [4,2,2,0], addScore
      ).toString()).toEqual(
        [4,4,0,0].toString()
      );

      expect(addScore).toHaveBeenCalledWith(4);
    });

    it('Scenario [4,2,2,2]', () => {
      const addScore = jest.fn();

      expect(mergeLeft(
        [4,2,2,2], addScore
      ).toString()).toEqual(
        [4,4,2,0].toString()
      );

      expect(addScore).toHaveBeenCalledWith(4);
    });

    it('Scenario [2,2,4,4]', () => {
      const addScore = jest.fn();

      expect(mergeLeft(
        [4,4,2,2], addScore
      ).toString()).toEqual(
        [8,4,0,0].toString()
      );

      expect(addScore).toHaveBeenCalledWith(8);
      expect(addScore).toHaveBeenCalledWith(4);
    });
  });

  describe('spawnNewBox', () => {
    it('Scenario [8,0,16]', () => {
      const fakeRandom = () => 1;
      const spawnNewBox = spawnNewBoxFactory({
        rndFn: fakeRandom
      });

      expect(spawnNewBox(
        [8,0,16]
      ).toString()).toEqual(
        [8,2,16].toString()
      );
    });

    it('Scenario [0,8,0,16]', () => {
      const fakeRandom = () => 2;
      const spawnNewBox = spawnNewBoxFactory({
        rndFn: fakeRandom
      });

      expect(spawnNewBox(
        [0,8,0,16]
      ).toString()).toEqual(
        [0,8,4,16].toString()
      );
    });
  });

  describe('isGameOver', () => {
    it('Scenario [2,0,4,8]: empty spaces', () => {
      expect(isGameOver(
        [2,0,4,8]
      )).toBe(false);
    });

    it('Scenario [2,2,4,8]: right merge', () => {
      expect(isGameOver(
        [2,2,4,8]
      )).toBe(false);
    });

    it('Scenario [2,4,2,8]: down merge', () => {
      expect(isGameOver(
        [2,4,2,8]
      )).toBe(false);
    });

    it('Scenario [2,4,8,16]: end game', () => {
      expect(isGameOver(
        [2,4,8,16]
      )).toBe(true);
    });
  });
});
