import { escapeHtmlPipe } from './safe-html.pipe';

describe('escapeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new escapeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
