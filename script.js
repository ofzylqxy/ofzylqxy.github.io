var aText = [
    "在这里写",
    "你想写的话",
    "超过二十行后",
    "就会覆盖"
];


var targetDay = "13 Mar 2022 23:08:00";


var app = new Vue({
    el: '#app',
    data: {
        open: false,
        text: 'Happy Anniversary 1 Year~',
        targetDayText: targetDay,
        textTyper: {
            iSpeed: 100, // time delay of print out
            iIndex: 0, // start printing array at this posision
            iArrLength: aText[0].length, // the length of the first text of array
            iScrollAt: 20, // start scrolling up at this many lines
            iTextPos: 0, // initialise text position
            sContents: '', // initialise contents variable
            iRow: null // initialise current row
        },
        curtext: '',
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    },
    mounted() {
        this.countdown();
        setInterval(this.countdown, 1000);
    },
    methods: {
        click: function () {
            this.open = !this.open;
        },
        countdown: function () {
            const targetDate = new Date(this.targetDayText);
            const currentDate = new Date();

            const totalSeconds = (currentDate - targetDate) / 1000;

            this.days = Math.floor(totalSeconds / 3600 / 24) + "天";
            this.hours = Math.floor(totalSeconds / 3600) % 24 + "时";
            this.minutes = Math.floor(totalSeconds / 60) % 60 + "分";
            this.seconds = Math.floor(totalSeconds) % 60 + "秒";
        },
        typewriter: function () {
            this.textTyper.sContents = ' ';
            this.textTyper.iRow = Math.max(0, this.textTyper.iIndex - this.textTyper.iScrollAt);
            while (this.textTyper.iRow < this.textTyper.iIndex) {
                this.textTyper.sContents += aText[this.textTyper.iRow++] + '<br />';
            }
            this.curtext = this.textTyper.sContents + aText[this.textTyper.iIndex].substring(0, this.textTyper.iTextPos) + "_";
            if (this.textTyper.iTextPos++ === this.textTyper.iArrLength) {
                this.textTyper.iTextPos = 0;
                this.textTyper.iIndex++;
                if (this.textTyper.iIndex !== aText.length) {
                    this.textTyper.iArrLength = aText[this.textTyper.iIndex].length;
                    setTimeout(this.typewriter, 500);
                }
            } else {
                setTimeout(this.typewriter, this.textTyper.iSpeed);
            }
        }
    },
    watch: {
        open: function () {
            if (this.open === true) {
                document.body.className = 'open';
                setTimeout(this.typewriter, 500);
            } else {
                document.body.className = '';
            }
        }
    }
});