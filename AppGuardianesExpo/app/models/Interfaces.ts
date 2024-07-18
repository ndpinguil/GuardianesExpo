interface Character {
  id?: number|null,
  actor: string,
  description: string,
  priceMinute: number,
  sceneId: number,
  scene: Scene
}

interface CharacterForm extends Omit<Character,'scene'> {}

interface Scene {
  id?: number|null,
  title: string,
  description: string,
  budget: number,
  minutes: number,
  filmId: number,
  film: Film,
  character: Array<Character>
}

interface SceneForm extends Omit<Scene, 'character'| 'film'> {}

interface Film{
  id?: number|null,
  title: string,
  director: string,
  duration: number,
  budget: number,
  scene: Array<Scene>
}

interface FilmForm extends Omit<Film,'scene'> {}

type FetchResponses = Character | Scene | Film;

type Forms = SceneForm | FilmForm | CharacterForm | {};