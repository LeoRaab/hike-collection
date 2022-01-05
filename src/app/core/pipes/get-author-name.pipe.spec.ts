import { GetAuthorNamePipe } from './get-author-name.pipe';

describe('GetAuthorNamePipe', () => {
  it('create an instance', () => {
    const pipe = new GetAuthorNamePipe();
    expect(pipe).toBeTruthy();
  });
});
