$(function () {
    var data = localStorage.webcarousel ? JSON.parse(localStorage.webcarousel) : undefined,
        index = 0,
        $frame = $('#wc-frame'),
        curTimeout = undefined;

    if (!data || !data.sites || !data.delaySeconds) {
        data = {
            delaySeconds: 5,
            sites: ['http://www.kitware.com']
        };
        localStorage.webcarousel = JSON.stringify(data);
    }

    console.log(JSON.stringify(data, null, 4));
    $('#settings').text(JSON.stringify(data, null, 4));
    $('#save').click(function () {
        data = JSON.parse($('#settings').val());
        localStorage.webcarousel = $('#settings').val();
    });

    function showNext() {
        if (index >= data.sites.length) {
            index = 0;
        }
        console.log(data.sites[index]);
        $frame.css('height', $('body').height());
        $frame.attr('src', data.sites[index]);
        index += 1;
        if (curTimeout) {
            clearTimeout(curTimeout);
        }
        if ($('#pause').text() === 'Pause') {
            curTimeout = setTimeout(showNext, data.delaySeconds * 1000);
        }
    }

    $('#prev').click(function () {
        index -= 1;
        if (index < 0) {
            index = data.sites.length - 1;
        }
        index -= 1;
        if (index < 0) {
            index = data.sites.length - 1;
        }
        showNext();
    });

    $('#next').click(function () {
        showNext();
    });

    $('#pause').click(function () {
        if ($('#pause').text() === 'Pause') {
            if (curTimeout) {
                clearTimeout(curTimeout);
            }
            $('#pause').text('Play');
        } else {
            showNext();
            $('#pause').text('Pause');
        }
    });

    showNext();
    $('#myModal').modal({show: false});
});
