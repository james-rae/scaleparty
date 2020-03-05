// named colours for fills
// https://www.w3.org/TR/SVG11/types.html#ColorKeywords

var pitchToCode = ['epitch', 'fpitch', 'fsharppitch', 'gpitch', 'gsharppitch', 'apitch', 'asharppitch', 'bpitch', 'cpitch', 'csharppitch', 'dpitch', 'dsharppitch'];

var pitches = pitchToCode.map(pc => {
    var raw = document.getElementsByClassName(pc);
    return  Array.prototype.map.call(raw, e => e);
});

var scales = [
    [0, 2, 4, 5, 7, 9, 11],    // Ionian
    [0, 2, 3, 5, 7, 9, 10],    // Dorian
    [0, 1, 3, 5, 7, 8, 10],    // Phrygian
    [0, 2, 4, 6, 7, 9, 11],    // Lydian
    [0, 2, 4, 5, 7, 9, 10],    // Mixolydian
    [0, 2, 3, 5, 7, 8, 10],    // Aeolian
    [0, 1, 3, 5, 6, 8, 10],    // Locrian
    [0, 2, 4, 7, 9],           // Pentatonic
    [0, 2, 3, 4, 7, 9],        // Blues
    [0, 2, 4, 6, 8, 9, 11],    // Melodic
    [0, 2, 4, 5, 8, 9, 11],    // Harmonic
    [0, 2, 4, 6, 8, 10],       // Whole Tone
    [0, 1, 3, 4, 6, 7, 9, 10], // Diminished
    [0, 2, 4, 5, 6, 8, 10],    // Arabian
    [0, 1, 4, 5, 7, 8, 11],    // Byzantine
    [0, 3, 4, 6, 7, 9, 10],    // Hungarian
    [0, 1, 4, 5, 6, 8, 11],    // Persian
    [0, 1, 3, 5, 7, 8, 11],    // Neapolitan Minor
    [0, 1, 4, 6, 7, 10, 11],   // Enigmatic
    [0, 2, 3, 6, 7, 9, 11],    // Lydian Diminished
    [0, 2, 3, 7, 9, 11],       // Hawaiian
    [0, 1, 3, 7, 8],           // Balinese
    [0, 1, 5, 7, 8]            // Japanese
];

function getRoot() {
    return parseInt(document.getElementById('keyPicker').value);
}

function updater(pitchIdx, attrName, attrVal) {
    pitches[pitchIdx].forEach(p => p.setAttribute(attrName, attrVal));
}

function setVis(pitchIdx, show) {
    var showcode = show ? 'visible' : 'hidden';
    updater(pitchIdx, 'visibility', showcode);
}

function setRoot(pitchIdx, root) {
    var rootcode = root ? 'palegreen' : 'lightskyblue';
    updater(pitchIdx, 'fill', rootcode);
}

function hideAll() {
    pitches.forEach(p => p.forEach(n => n.setAttribute('visibility', 'hidden')));
}

function showScale() {
    console.log('show da scale');
    var scaleIdx = parseInt(document.getElementById('scalePicker').value);
    var rootIdx = getRoot();
    var minor = document.getElementById('minorFlag').checked ? 3 : 0;

    hideAll();

    scales[scaleIdx].forEach(p => {
        var pit = (p + rootIdx + minor) % 12;
        setVis(pit, true);
        setRoot(pit, pit === rootIdx);
    });

}

function showFreeForm() {
    var rootIdx =  getRoot();
    pitchToCode.forEach((pcode, i) => {
        var vis = document.getElementById(pcode + 'C').checked;
        setVis(i, vis);
        if (vis) {
            setRoot(i, i === rootIdx);
        }
    });
}

showScale();