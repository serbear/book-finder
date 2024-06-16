// Функция для замены текста на эмодзи флажка
const replaceTextWithFlag = (languageArray) => {
    if (!languageArray) return [];

    let x = [];
    languageArray.forEach((language) => {
        x.push(language.toUpperCase());
    })

    x.sort();
    return x.join(', ');
}

export default replaceTextWithFlag;
