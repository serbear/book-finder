import './App.css'
import SearchBox from "./components/search-box.jsx";
import Header from "./components/header.jsx";
import ResultsBox from "./components/search-result/results-box.jsx";
import {useEffect, useState} from "react";
import i18n from "i18next";
import {
    DARK_THEME_NAME,
    LIGHT_THEME_NAME,
    THEME_LOCAL_STORAGE_KEY
} from "./services/enums.js";


function App() {

    const [currentQuery, setCurrentQuery] = useState(null);
    const [currentTheme, setCurrentTheme] = useState(LIGHT_THEME_NAME);

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

        if (savedTheme) {
            SaveTheme(savedTheme);
        } else {
            localStorage.setItem(THEME_LOCAL_STORAGE_KEY, currentTheme);
        }

        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }, []);

    const handleThemeChange = () => {
        let savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
        savedTheme = savedTheme === LIGHT_THEME_NAME
            ? SaveTheme(DARK_THEME_NAME)
            : SaveTheme(LIGHT_THEME_NAME);
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }

    const handleSearch = (query) => setCurrentQuery(query);

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language).then();
    }

    const SaveTheme = (themeName) => {
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeName);
        setCurrentTheme(themeName);
        return themeName;
    }

    return (
        <>
            <div className="container-fluid">
                <Header
                    onChangeLanguage={handleLanguageChange}
                    onChangeTheme={handleThemeChange}
                    themeIcon={currentTheme}/>
                <SearchBox onSearch={handleSearch}/>
                <ResultsBox query={currentQuery}/>
            </div>
        </>
    )
}

export default App
