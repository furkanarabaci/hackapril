import { LetterState } from 'components/FlLetter';
import service from '.';

// let currentKey = '';
// let currentWordID = -1;
let token = '';

// export async function startGame(wordID?: number) {
//   try {
//     const body = wordID ? { wordID } : {};
//     const response = await service.post('/start_game/', body);
//     currentKey = response.data.key;
//     currentWordID = response.data.wordID;
//     return response;
//   } catch (e) {
//     console.error('startGame request failed: ', e);
//     throw e;
//   }
// }

export async function guess(word: string) {
  try {
    // if (!currentKey) {
    //   await startGame();
    // }
    const response = await service.request(`/${word}`, {
      method: 'GET'
    });
    const responseParsed = JSON.parse(response);
    token = responseParsed.continuationToken;
    const wordState = responseParsed.result.map((guess) => {
      const newState = guess.colour === 'grey' ? LetterState.FAIL : guess.colour === 'green' ? LetterState.SUCCESS : LetterState.HINT;
      return {
        letter: guess.letter,
        state: newState
      };
    });

    return wordState;
  } catch (e) {
    console.error('guess request failed: ', e);
    throw e;
  }
}

// export async function finish() {
//   try {
//     const body = { id: currentWordID, key: currentKey };
//     const response = await service.post('/finish/', body);
//     currentKey = '';
//     currentWordID = -1;
//     return response;
//   } catch (e) {
//     console.error('finish request failed: ', e);
//     throw e;
//   }
// }
