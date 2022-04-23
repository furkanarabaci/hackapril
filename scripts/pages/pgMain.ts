import PgMainDesign from 'generated/pages/pgMain';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Font from '@smartface/native/ui/font';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import Color from '@smartface/native/ui/color';
import { guess } from 'service/wordle';
import FlWord from 'components/FlWord';
import AutoCapitalize from '@smartface/native/ui/textbox/autocapitalize';
import { ANIMATION_DURATION, LetterState } from 'components/FlLetter';
import Toast from '@smartface/native/ui/toast';
import Screen from '@smartface/native/device/screen';

export default class PgMain extends PgMainDesign {
  guesses: FlWord[];
  currentGuessNumber = 0;
  currentWord = '';
  private _isRequesting = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.initTextBox();
    this.guesses = [this.flFirstGuess, this.flSecondGuess, this.flThirdGuess, this.flFourthGuess, this.flFifthGuess, this.flSixthGuess];
    this.btnGuess.onPress = () => this.guessClick();
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.initCustomHeaderBar();
  }

  initCustomHeaderBar() {
    const customHeaderBar = this.children.customHeaderBar;
    customHeaderBar.imgInstruction.on('touchEnded', () => this.router.push('instructions'));
    customHeaderBar.imgStatistics.on('touchEnded', () => this.router.push('statistics'));
  }

  initTextBox() {
    this.tbGuess.hint = 'Enter your guess here';
    this.tbGuess.hintTextColor = Color.WHITE;
    this.tbGuess.textColor = Color.WHITE;
    this.tbGuess.onTextChanged = (e) => {
      const location = e.location;
      const currentGuess = this.guesses[this.currentGuessNumber];
      currentGuess.setLetterofElement(e.insertedText, location);
    };
    this.tbGuess.onActionButtonPress = () => this.guessClick();
    this.tbGuess.autoCapitalize = AutoCapitalize.NONE;
  }

  guessClick() {
    if (this._isRequesting) {
      return; // No duplicate requests
    }
    if (this.tbGuess.text.length !== 5) {
      return; //TODO: Show toast when the words are invalid
    }
    this.currentWord = this.tbGuess.text;
    this.guessWord();
  }

  async guessWord() {
    this._isRequesting = true;
    try {
      const response = await guess(this.tbGuess.text);
      console.info(response);
      const currentGuess = this.guesses[this.currentGuessNumber];
      currentGuess.word = this.currentWord;
      const promises = response.map((guess: { letter: string; state: LetterState }, index: number) => {
        return () => this.changeLetterStateAsync(currentGuess, guess.state, index);
      });
      this.checkEndCondition();
      //@ts-ignore
      await Promise.series(promises);
      this.currentGuessNumber++;
    } catch (e) {
      const toast = new Toast();
      toast.duration = 2;
      toast.message = 'Invalid Word!';
      toast.bottomOffset = Screen.height / 2;
      toast.show();
    } finally {
      this._isRequesting = false;
    }
  }

  async changeLetterStateAsync(guessInstance: FlWord, state, element) {
    return new Promise((resolve, reject) => {
      guessInstance.setLetterState(state, element);
      setTimeout(() => {
        resolve(state);
      }, ANIMATION_DURATION);
    });
  }

  clearWords() {
    this.guesses.forEach((guess) => (guess.word = ''));
  }

  checkEndCondition() {
    const isAlllSuccess = this;
    const lastGuess = this.guesses[this.currentGuessNumber];
    const didWin = lastGuess.letters.every((letter) => letter.state === LetterState.SUCCESS);
    const toast = new Toast();
    toast.duration = 2;
    toast.bottomOffset = Screen.height / 2;
    if (!didWin && this.currentGuessNumber === 5) {
      // It was your last gues and you didn't win.
      toast.messageTextColor = Color.RED;
      toast.message = 'You Lose!';
      toast.show();
    }
    if (didWin) {
      toast.messageTextColor = Color.GREEN;
      toast.message = 'You Lose!';
      toast.show();
    }
  }
}
