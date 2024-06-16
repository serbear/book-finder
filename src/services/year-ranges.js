const getYearRanges = (years) => {

    if (!years) return [];

    // Сортируем коллекцию годов
    years.sort((a, b) => a - b);

    // Массив для хранения диапазонов
    let ranges = [];
    // Переменные для отслеживания начала и конца текущего диапазона
    let start = years[0];
    let end = years[0];

    for (let i = 1; i < years.length; i++) {
        // Если текущий год последовательный
        if (years[i] === end + 1) {
            end = years[i];
        } else {
            // Если текущий год не последовательный, добавляем предыдущий
            // диапазон в массив
            ranges.push(start === end ? `${start}` : `${start}-${end}`);
            // Обновляем начало и конец для нового диапазона
            start = years[i];
            end = years[i];
        }
    }

    // Добавляем последний диапазон в массив
    ranges.push(start === end ? `${start}` : `${start}-${end}`);

    return ranges.join(", ");
}

export default getYearRanges;