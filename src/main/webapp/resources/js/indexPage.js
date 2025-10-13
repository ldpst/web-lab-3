
import {DateTime} from './date-time.js';

$(() => {
    // const interval = 5000;
    //
    // const clock = new Clock({
    //     $hour: $('.hour'),
    //     $minute: $('.minute'),
    //     $second: $('.second'),
    // });
    //
    // clock.show();
    // setInterval(clock.show, interval);

    const dateTime = new DateTime({
        $dayName: $('#day-name'),
        $month: $('#month'),
        $dayNumber: $('#day-number'),
        $year: $('#year'),
        $hour: $('#hour'),
        $minutes: $('#minutes'),
        $seconds: $('#seconds'),
        $period: $('#period'),
    });

    dateTime.show();
    setInterval(dateTime.show, 6000);
});