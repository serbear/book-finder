import {useState} from "react";
import {useTranslation} from 'react-i18next';
import {
    DARK_THEME_NAME, FLAGS,
    LIGHT_THEME_NAME
} from "../services/enums.js";

// eslint-disable-next-line
const Header = ({onChangeLanguage, onChangeTheme, themeIcon}) => {
    const {t} = useTranslation();

    const getLang = () => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        return savedLanguage ? savedLanguage : 'en';
    }

    const getThemeIcon = (value) => {
        let iconCollection = {};
        iconCollection[LIGHT_THEME_NAME] = "bi-sun-fill";
        iconCollection[DARK_THEME_NAME] = "bi-moon-fill";

        return Object.prototype.hasOwnProperty.call(iconCollection, value)
            ? iconCollection[value]
            : 'bi-bug-fill';
    }

    const [state, setState] = useState(getLang);

    const setFlag = (language) => {
        return `${FLAGS[language]} ${language}`
    }

    const handleChangeLanguage = (event) => {
        const language = event.target.text.split(' ')[1];
        if (onChangeLanguage) {
            setState(language);
            onChangeLanguage(language);
        }
    };

    const handleChangeTheme = () => {
        if (onChangeTheme) onChangeTheme();
    }

    // noinspection JSCheckFunctionSignatures
    return (
        <>
            <div className="d-flex flex-row-reverse">
                <div>
                    <button
                        className="btn btn-outline-secondary btn-sm border-0"
                        onClick={handleChangeTheme}>
                        <i className={`bi ${getThemeIcon(themeIcon)}`}/>
                    </button>
                </div>
                <div className="dropdown">
                    <button
                        id="language-switch"
                        className="btn btn-outline-secondary dropdown-toggle
                        btn-sm border-0"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {setFlag(state)}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item"
                               href="#"
                               onClick={handleChangeLanguage}>
                                {`${setFlag('en')}`}
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item"
                               href="#"
                               onClick={handleChangeLanguage}>
                                {`${setFlag('et')}`}
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item"
                               href="#"
                               onClick={handleChangeLanguage}>
                                {`${setFlag('ru')}`}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <h1>{t('title')}</h1>
        </>
    );
};

export default Header;