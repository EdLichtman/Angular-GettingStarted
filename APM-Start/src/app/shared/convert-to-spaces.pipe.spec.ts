import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';

describe('AppComponent', () => {
  it('should convert the requested character', () => {
    const replaceableText = 'This-is my pipe';
    const replaceableCharacter = '-';

    var replacedText = new ConvertToSpacesPipe().transform(replaceableText, replaceableCharacter);
    var expectedReplacedText = 'This is my pipe';
    expect(replacedText).toEqual(expectedReplacedText);
  });
});