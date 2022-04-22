import FlWordDesign from 'generated/my-components/FlWord';
import FlLetter, { LetterState } from './FlLetter';

export default class FlWord extends FlWordDesign {
  pageName?: string | undefined;
  private _word = 'CCCCC';
  private letters: FlLetter[];
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
    this.letters = [this.flFirstLetter, this.flSecondLetter, this.flThirdLetter, this.flFourthLetter, this.flFifthLetter];
  }

  get word() {
    return this._word;
  }

  set word(value: string) {
    if (value.length !== this.letters.length) {
      throw Error('Given word should be equal to letter count');
    }
    this.letters.forEach((letter, index) => (letter.letter = value[index]));
    this._word = value;
  }

  setLetterState(letterState: LetterState, element: number) {
    if (element >= this.word.length || element < 0) {
      return; // Invalid element, do nothing
    }
    this.letters[element].changeState(letterState);
  }
}
