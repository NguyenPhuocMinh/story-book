import { THEME_TYPES } from '../constants';

const changeThemes = (theme) => dispatch => {
  dispatch({
    type: THEME_TYPES.CHANGE_THEME,
    payload: theme
  })
}

const themeActions = {
  changeThemes
};

export default themeActions;