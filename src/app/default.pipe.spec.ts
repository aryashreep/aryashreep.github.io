import {DefaultPipe} from './default.pipe';

describe('Pipe: Default', () => {
  let pipe: DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  it('providing no value returns fallback', () => {
    expect(pipe.transform('', 'blogger')).toBe('blogger');
  });

  it('providing a value returns value', () => {
    expect(pipe.transform('blogger', 'fallback')).toBe('blogger');
  });

});