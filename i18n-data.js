// Translate the lesson, skill and song data in place (i18n.js), after the data files and before app.js reads them.
for(const name of ['PIANO_DATA','PIANO_SKILLS','PIANO_SONGS'])window.I18N?.translateData(window[name]);
