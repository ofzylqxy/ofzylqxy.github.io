var aText = [
    "在这里写",
    "你想写的话",
    "超过二十行后",
    "就会覆盖",
    "之前写过的话"
];


var targetDay = "13 Mar 2022 23:08:00";


var app = new Vue({
    el: '#app',
    data: {
        open: false,
        text: 'Happy 1 Year Anniversary~',
        targetDayText: targetDay,
        textTyper: {
            iSpeed: 100, // 每个字打印的速度，单位毫秒
            iIndex: 0, // 开始打印的行index
            iArrLength: aText[0].length, // 第一句话的长度
            iScrollAt: 20, // 最大行数，超过后会从头开始覆盖
            iTextPos: 0, // 当前行打印的index
            sContents: '', // 显示的字
            iRow: null // 当前打印的行的index，相对于iScrollAt
        },
        curText: '',
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
            // TODO 到时间了才能打开
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
            this.curText = this.textTyper.sContents + aText[this.textTyper.iIndex].substring(0, this.textTyper.iTextPos) + "_";
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
        // 监听open的状态
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