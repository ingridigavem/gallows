function createSprite(selector) {

    function hasNext() {

        return current + 1 <= last;
    }

    function isFinished() {
        if(!hasNext()) return true; 
        return false;
    }

    function moveFrame (from, to) {

        $element.removeClass(from)
            .addClass(to);
    }

    function nextFrame() {
        if (hasNext()) moveFrame (frames[current], frames[++current]);
    }

    function reset() {
        moveFrame (frames[current], frames[0]);
        current = 0;
    }

    const $element = $(selector);

    const frames = [
        'frame1', 'frame2', 'frame3', 'frame4', 'frame5',
        'frame6', 'frame7', 'frame8', 'frame9'
    ];

    let current = 0;

    const last = frames.length -1; 

    $element.addClass(frames[current]);

    return {
        nextFrame,
        isFinished,
        reset
    };
}